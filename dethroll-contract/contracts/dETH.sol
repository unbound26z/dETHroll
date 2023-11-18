//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import '@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol';
import '@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DETHRoll is Ownable, VRFConsumerBaseV2 {
    struct Player {
        string discord;
        address sigWallet;
    }

    address _owner;

    uint256 private constant ROLL_IN_PROGRESS = 42;
    uint32 callbackGasLimit = 40000;
    uint32 numWords = 1;
    uint16 requestConfirmations = 3;

    bytes32 s_keyHash =
        0xd729dc84e21ae57ffb6be0053bf2b0668aa2aaf300a2a7b2ddf7dc0bb6e875a8;

    VRFCoordinatorV2Interface COORDINATOR;

    //One dETH will always be worth 9 USD
    uint256 constant dETHPrice = 9;

    mapping(address => Player) players;

    ERC20 currency;

    uint256 lastRandomNumber;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    mapping(address => Game) pendingGames;

    struct Game {
        address player1;
        address player2;
        uint256 startTimestamp;
        uint256 lastRandomNumber;
        uint256 betAmount;
        bool lastPlayer1;
        uint256 rollsCount;
        address winner;
    }

    event GameCreated(uint256 amount, address player1);

    event GameJoin(
        string gameId,
        uint256 amount,
        address player2,
        address player1
    );

    event Roll(string gameId, address player, uint256 rolledNumber);

    event GameWon(
        string gameId,
        address winner,
        address loser,
        uint256 wonAmount
    );

    mapping(string => Game) games;

    mapping(address => uint256) balances;

    uint64 s_subscriptionId;

    // map rollers to requestIds
    mapping(uint256 => string) private s_rollers;
    // map vrf results to rollers
    mapping(string => uint256) private s_results;

    constructor(
        address _vrfCoordinator,
        address _currency,
        uint64 subscriptionId
    ) VRFConsumerBaseV2(_vrfCoordinator) {
        _owner = msg.sender;
        currency = ERC20(_currency);
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 d20Value = (randomWords[0] % 20) + 1;
        s_results[s_rollers[requestId]] = d20Value;

        string memory gameId = s_rollers[requestId];

        Game memory game = games[gameId];

        uint256 seed = game.lastRandomNumber == 0 ? 100 : game.lastRandomNumber;

        uint256 randomNumber = (d20Value % seed) + 1;

        address player = game.lastPlayer1 ? game.player1 : game.player2;

        games[gameId].lastRandomNumber = randomNumber;
        games[gameId].rollsCount += 1;

        if (randomNumber == 1) {
            games[gameId].winner = player;
            emit GameWon(
                gameId,
                player,
                games[gameId].lastPlayer1
                    ? games[gameId].player1
                    : games[gameId].player2,
                game.betAmount * 2
            );
        }

        emit Roll(gameId, player, randomNumber);
    }

    function register(
        address _mainWallet,
        string memory _discord,
        address _sigWallet
    ) public onlyOwner {
        require(
            players[_mainWallet].sigWallet == address(0),
            'Player already registered'
        );

        players[_mainWallet] = Player({
            discord: _discord,
            sigWallet: _sigWallet
        });
    }

    function depositErc20(uint256 amount) public payable {
        currency.transferFrom(msg.sender, address(this), amount);

        uint256 currencyBalance = recalculateCurrencyAmount(amount);

        balances[msg.sender] = balances[msg.sender] + currencyBalance;
    }

    function recalculateCurrencyAmount(
        uint256 depositAmount
    ) private pure returns (uint256) {
        return depositAmount / dETHPrice;
    }

    function initGame(
        uint256 _betAmount,
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public {
        address player1 = verifyMessage(_hashedMessage, _v, _r, _s);

        Game memory defaultGame = getDefaultGame();
        defaultGame.player1 = player1;
        defaultGame.betAmount = _betAmount;

        Game memory existingPendingGame = pendingGames[player1];

        uint256 balance = balances[player1];

        require(
            balance > _betAmount,
            "You don't have enough balance for this game"
        );

        require(
            existingPendingGame.player1 == address(0),
            'You already have pending game!'
        );

        pendingGames[player1] = defaultGame;

        emit GameCreated(_betAmount, player1);
    }

    function getMinePendingGame(
        address player
    ) public view returns (Game memory) {
        return pendingGames[player];
    }

    function verifyMessage(
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public pure returns (address) {
        bytes memory prefix = '\x19Ethereum Signed Message:\n32';
        bytes32 prefixedHashMessage = keccak256(
            abi.encodePacked(prefix, _hashedMessage)
        );
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function joinGame(
        string memory gameId,
        address oponent,
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public {
        address player2 = verifyMessage(_hashedMessage, _v, _r, _s);

        Game memory pendingGame = pendingGames[oponent];

        require(
            pendingGame.player1 != address(0),
            'Could not find pending game!'
        );

        pendingGame.player2 = player2;

        pendingGames[oponent] = getDefaultGame();

        games[gameId] = pendingGame;

        emit GameJoin(
            gameId,
            pendingGames[oponent].betAmount,
            player2,
            oponent
        );
    }

    function getDefaultGame() private pure returns (Game memory) {
        return
            Game({
                player1: address(0),
                player2: address(0),
                startTimestamp: 0,
                betAmount: 0,
                lastPlayer1: false,
                lastRandomNumber: 0,
                rollsCount: 0,
                winner: address(0)
            });
    }

    function roll(
        string memory gameId,
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public returns (uint256 requestId) {
        address player = verifyMessage(_hashedMessage, _v, _r, _s);

        Game memory game = games[gameId];

        require(game.winner == address(0), 'Game already resolved');

        require(
            game.player1 != address(0) && game.player2 != address(0),
            'Invalid game config!'
        );

        if (game.lastPlayer1) {
            require(player == game.player2, "Can't roll twice in row");
            games[gameId].lastPlayer1 = false;
        } else {
            require(player == game.player1, "Can't roll twice in row");
            games[gameId].lastPlayer1 = true;
        }

        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_rollers[requestId] = gameId;
        s_results[gameId] = ROLL_IN_PROGRESS;
    }

    function terminatePendingGame(
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public {
        address player = verifyMessage(_hashedMessage, _v, _r, _s);

        Game memory pendingGame = pendingGames[player];

        require(
            pendingGame.player1 != address(0),
            'Could not find pending game'
        );

        pendingGames[player] = getDefaultGame();
    }

    function getUserBalance(address user) public view returns (uint256) {
        return balances[user];
    }

    function getPlayer(address player) public view returns (Player memory) {
        return players[player];
    }

    function getGame(string memory gameId) public view returns (Game memory) {
        return games[gameId];
    }

    function getRandomNumber() public returns (uint256 seed) {
        seed = (seed + block.timestamp + block.prevrandao) % 100;
        return seed;
    }
}
