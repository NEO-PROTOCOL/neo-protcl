// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title NEØ Protocol — Node Designer Review Contract
/// @author MELLØ
/// @notice Governs design/system review missions prior to node admission
/// @dev This contract is PRE-NODE, CONDITIONAL, AUDITABLE, and FOUNDATION-LOCKED

contract NodeDesignerReview {

    // =============================
    // Protocol Anchors
    // =============================

    string public constant PROTOCOL = unicode"NEØ Protocol";
    bytes32 public constant PROTOCOL_ID = keccak256(unicode"NEØ_PROTOCOL_CORE");
    string public constant MODULE = "NodeDesignerReview";

    address public architect;

    constructor() {
        architect = msg.sender;
    }

    modifier onlyArchitect() {
        require(msg.sender == architect, "Not authorized");
        _;
    }

    // =============================
    // Mission State Machine
    // =============================

    enum Status {
        NONE,
        INVITED,
        ACCEPTED,
        SUBMITTED,
        VALIDATED,
        EXPIRED
    }

    struct ReviewMission {
        address reviewer;
        string scope;                 // e.g. "Identity & Visual Coherence"
        bytes32 proofOfIntent;        // PoI hash
        uint256 invitedAt;
        uint256 acceptedAt;
        uint256 deadline;
        uint256 submittedAt;
        bytes32 proofOfDelivery;      // hash of Notion/IPFS/GitHub material
        Status status;
    }

    mapping(address => ReviewMission) public missions;

    // =============================
    // Events (Indexable Narrative)
    // =============================

    event ReviewInvited(
        address indexed reviewer,
        bytes32 proofOfIntent,
        uint256 deadline
    );

    event ReviewAccepted(address indexed reviewer);
    event ReviewSubmitted(address indexed reviewer, bytes32 proofOfDelivery);
    event ReviewValidated(address indexed reviewer);
    event ReviewExpired(address indexed reviewer);

    // =============================
    // 1. Invite Reviewer (PoI)
    // =============================

    function inviteReviewer(
        address _reviewer,
        string calldata _scope,
        uint256 _deadline,
        bytes32 _proofOfIntent
    ) external onlyArchitect {
        require(
            missions[_reviewer].status == Status.NONE,
            "Mission already exists"
        );

        missions[_reviewer] = ReviewMission({
            reviewer: _reviewer,
            scope: _scope,
            proofOfIntent: _proofOfIntent,
            invitedAt: block.timestamp,
            acceptedAt: 0,
            deadline: _deadline,
            submittedAt: 0,
            proofOfDelivery: bytes32(0),
            status: Status.INVITED
        });

        emit ReviewInvited(_reviewer, _proofOfIntent, _deadline);
    }

    // =============================
    // 2. Accept Mission
    // =============================

    function acceptReview() external {
        ReviewMission storage m = missions[msg.sender];
        require(m.status == Status.INVITED, "Not invited");

        m.acceptedAt = block.timestamp;
        m.status = Status.ACCEPTED;

        emit ReviewAccepted(msg.sender);
    }

    // =============================
    // 3. Submit Review
    // =============================

    function submitReview(bytes32 _proofOfDelivery) external {
        ReviewMission storage m = missions[msg.sender];
        require(m.status == Status.ACCEPTED, "Mission not accepted");
        require(block.timestamp <= m.deadline, "Deadline exceeded");

        m.proofOfDelivery = _proofOfDelivery;
        m.submittedAt = block.timestamp;
        m.status = Status.SUBMITTED;

        emit ReviewSubmitted(msg.sender, _proofOfDelivery);
    }

    // =============================
    // 4. Validate Review
    // =============================

    function validateReview(address _reviewer) external onlyArchitect {
        ReviewMission storage m = missions[_reviewer];
        require(m.status == Status.SUBMITTED, "Review not submitted");

        m.status = Status.VALIDATED;

        emit ReviewValidated(_reviewer);
    }

    // =============================
    // 5. Expire Mission
    // =============================

    function expireReview(address _reviewer) external {
        ReviewMission storage m = missions[_reviewer];
        require(
            m.status == Status.INVITED || m.status == Status.ACCEPTED,
            "Cannot expire"
        );
        require(block.timestamp > m.deadline, "Deadline not reached");

        m.status = Status.EXPIRED;

        emit ReviewExpired(_reviewer);
    }

    // =============================
    // View Helpers
    // =============================

    function getStatus(address _reviewer) external view returns (Status) {
        return missions[_reviewer].status;
    }

    function getMission(address _reviewer) external view returns (ReviewMission memory) {
        return missions[_reviewer];
    }
}
