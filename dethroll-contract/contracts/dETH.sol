//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import '@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DETHRoll is RrpRequesterV0, Ownable {
    struct Player {
        string discord;
        address sigWallet;
    }

    address _owner;

    //One dETH will always be worth 9 USD
    uint256 constant dETHPrice = 9;

    mapping(address => Player) players;

    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;
    uint256 public _qrngUint256;

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

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {
        _owner = msg.sender;
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

    function setParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        address _sponsorWallet
    ) public onlyOwner {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    function makeRequestUint256() private {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ''
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
    }

    function fulfillUint256(
        bytes32 requestId,
        bytes calldata data
    ) public onlyAirnodeRrp {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            'Request ID not known'
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        lastRandomNumber = qrngUint256;
    }

    function depositErc20(address token, uint256 amount) public payable {
        ERC20 tokenContract = ERC20(token);

        tokenContract.transferFrom(msg.sender, address(this), amount);

        uint256 currencyBalance = recalculateCurrencyAmount(amount);

        balances[msg.sender] = balances[msg.sender] + currencyBalance;
    }

    receive() external payable {
        uint256 currencyBalance = recalculateCurrencyAmount(msg.value);

        balances[msg.sender] = balances[msg.sender] + currencyBalance;
    }

    function recalculateCurrencyAmount(
        uint256 depositAmount
    ) private pure returns (uint256) {
        //TODO: user oracle for fetching ETH/token prices
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
    ) public {
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
        makeRequestUint256();

        uint256 seed = game.lastRandomNumber == 0 ? 100 : game.lastRandomNumber;

        uint256 randomNumber = (lastRandomNumber % seed) + 1;

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
}
