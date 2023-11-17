pragma solidity 0.8.19;

contract dETH {
    struct Player {
        string discord;
        address mainWallet;
    }

    mapping(address => Player[]) players;

    struct Game {
        address player1;
        address player2;
        int startTimestamp;
    }

    mapping(bytes => Game) games;

    mapping(address => uint256) balances;

    constructor() {}
}
