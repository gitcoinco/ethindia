pragma solidity ^0.4.4;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/zeppelin/math/SafeMath.sol";

contract InvoiceApp is AragonApp {
    using SafeMath for uint256;

    /// Events
    event Increment(address indexed entity, uint256 step);
    event Decrement(uint256 step);
    event CreatePaymentRequest(uint256 id, string payer, uint256 amount);
    event CreatePaymentRequestBackend(uint256 id, string payer, uint256 amount);
    event PaymentCreated(bytes32 requestId);
    event PaymentFulfilled(bytes32 requestId);
    event DummyEvent();
    event FulfilledPayments(uint256[] payments);

    enum State { Created, Fulfilled, Canceled }

    struct Details {
      bytes32 requestId;
      State state;
    }

    mapping(uint256 => Details) public status;
    /// State
    uint256 public value;
    uint256 public id;

    /// ACL
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");

    /**
     * @notice Increment the counter by `step`
     * @param step Amount to increment by
     */
    function increment(uint256 step) auth(INCREMENT_ROLE) external {
        value = value.add(step);
        Increment(msg.sender, step);
    }

    function dummyEvent() public {
      DummyEvent();
    }

    /**
     * @notice Create Payment Request of `amount` for `payer`
     * @param payer payer
     */
    function createPaymentRequest(string payer, uint256 amount) external {
      CreatePaymentRequest(id, payer, amount);
      CreatePaymentRequestBackend(id++, payer, amount);
      // Increment(msg.sender, 1);
    }

    function setRequestId(uint256 id, bytes32 _requestId) external {
      status[id].requestId = _requestId;
      status[id].state = State.Created;
      PaymentCreated(_requestId);
    }

    function refresh() public {
      uint256[] memory fulfilledPayments = new uint256[](id);
      for (uint i = 0; i < id; i++) {
        if (status[i].state == State.Fulfilled) {
          fulfilledPayments[i] = 1;
        }
      }
      FulfilledPayments(fulfilledPayments);
    }

    function paymentFulfilled(bytes32 _requestId) external {
      for (uint i = 0; i < id; i++) {
        if (status[i].requestId == _requestId) {
          status[i].state = State.Fulfilled;
        }
      }
      PaymentFulfilled(_requestId);
    }

    /**
     * @notice Decrement the counter by `step`
     * @param step Amount to decrement by
     */
    function decrement(uint256 step) external {
        value = value.add(step);
        Decrement(step);
    }
}
