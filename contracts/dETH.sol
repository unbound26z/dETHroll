//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import '@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract dETH is RrpRequesterV0, Ownable {
    struct Player {
        string discord;
        address mainWallet;
    }

    address _owner;

    mapping(address => Player[]) players;

    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;
    uint256 public _qrngUint256;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    Game[] private pendingGames;

    struct Game {
        address player1;
        address player2;
        uint256 startTimestamp;
        uint256 lastRandomNumber;
        uint256 betAmount;
        bool lastPlayer1;
    }

    mapping(bytes => Game) games;

    mapping(address => uint256) balances;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {
        _owner = msg.sender;
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
    ) public onlyAirnodeRrp returns (uint256) {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            'Request ID not known'
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        return qrngUint256;
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
        uint256 _depositAmount
    ) private pure returns (uint256) {
        //TODO: user oracle for fetching ETH/token prices
        return 10;
    }

    function initGame(
        uint256 _betAmount,
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public {
        address player1 = verifyMessage(_hashedMessage, _v, _r, _s);
        for (uint256 i = 0; i < pendingGames.length; i++) {
            Game memory pGame = pendingGames[i];

            if (pGame.player1 == msg.sender) {
                revert('You are already in penging game!');
            }
        }

        pendingGames.push(
            Game({
                player1: player1,
                player2: address(0),
                betAmount: _betAmount,
                startTimestamp: block.timestamp,
                lastRandomNumber: 0,
                lastPlayer1: false
            })
        );
    }

    function getPendingGames() public view returns (Game[] memory) {
        return pendingGames;
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
}
