//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DETHRoll is Ownable {
    struct Player {
        string discord;
        address mainWallet;
    }

    address _owner;

    //One dETH will always be worth 9 USD
    uint256 constant dETHPrice = 9;

    mapping(address => Player) players;

    ERC20 currency;

    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;
    uint256 public _qrngUint256;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    mapping(address => Game) pendingGames;

    struct Game {
        address player1;
        address player2;
        uint256 startTimestamp;
        uint256 betAmount;
        uint256 lastRandomNumber;
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

    constructor(address _currency) {
        _owner = msg.sender;
        currency = ERC20(_currency);
    }

    function register(
        address _mainWallet,
        string memory _discord,
        address _sigWallet
    ) public onlyOwner {
        players[_sigWallet] = Player({
            discord: _discord,
            mainWallet: _mainWallet
        });
    }

    function depositErc20(uint256 amount, address sigWallet) public payable {
        currency.transferFrom(msg.sender, address(this), amount);

        uint256 currencyBalance = recalculateCurrencyAmount(amount);

        // Player memory player = players[sigWallet];

        // require(player.mainWallet == msg.sender, 'Invalid wallet provided!');

        balances[sigWallet] = balances[sigWallet] + currencyBalance;
    }

    function recalculateCurrencyAmount(
        uint256 depositAmount
    ) private pure returns (uint256) {
        return depositAmount / dETHPrice;
    }

    function initGame(uint256 _betAmount, address player1) public onlyOwner {
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

    function joinGame(
        string memory gameId,
        address oponent,
        address player2
    ) public onlyOwner {
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

    function resetPlayer(address player) public onlyOwner {
        pendingGames[player] = getDefaultGame();
    }

    function roll(string memory gameId, address player) public onlyOwner {
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
        uint256 generatedRandomNumber = getRandomNumber();

        uint256 seed = game.lastRandomNumber == 0 ? 100 : game.lastRandomNumber;

        uint256 randomNumber = (generatedRandomNumber % seed) + 1;

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

    function terminatePendingGame(address player) public onlyOwner {
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

    function getPendingGameForWallet(
        address player
    ) public view returns (Game memory) {
        return pendingGames[player];
    }

    function getPlayer(address player) public view returns (Player memory) {
        return players[player];
    }

    function getGame(string memory gameId) public view returns (Game memory) {
        return games[gameId];
    }

    function getRandomNumber() public view returns (uint256 seed) {
        seed = block.prevrandao;
        return seed;
    }
}
