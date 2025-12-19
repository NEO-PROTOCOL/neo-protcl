// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title NEØ Protocol — Node Admission
/// @author MELLØ
/// @notice Node admission based on real state (reputation threshold)
/// @dev Node is NOT invited. Node REACHES minimum condition.

interface IReputation {
    function getReputation(address node) external view returns (int256);
}

contract NodeAdmission {

    // =============================
    // Protocol Anchors
    // =============================

    string public constant PROTOCOL = unicode"NEØ Protocol";
    bytes32 public constant PROTOCOL_ID = keccak256(unicode"NEØ_PROTOCOL_CORE");
    string public constant MODULE = "NodeAdmission";

    IReputation public reputation;
    
    /// @notice Minimum reputation required for admission
    int256 public constant ADMISSION_THRESHOLD = 10;

    mapping(address => bool) public admitted;

    // =============================
    // Events
    // =============================

    event NodeAdmitted(address indexed node);

    // =============================
    // Constructor
    // =============================

    constructor(address _reputationContract) {
        reputation = IReputation(_reputationContract);
    }

    // =============================
    // Core Functions
    // =============================

    /// @notice Admit a node based on reputation threshold
    /// @dev Node must have reputation >= ADMISSION_THRESHOLD
    function admit() external {
        require(!admitted[msg.sender], "Already admitted");

        int256 rep = reputation.getReputation(msg.sender);
        require(rep >= ADMISSION_THRESHOLD, "Insufficient reputation");

        admitted[msg.sender] = true;

        emit NodeAdmitted(msg.sender);
    }

    /// @notice Check if an address is admitted
    /// @param _node Address to check
    /// @return true if admitted, false otherwise
    function isAdmitted(address _node) external view returns (bool) {
        return admitted[_node];
    }
}
