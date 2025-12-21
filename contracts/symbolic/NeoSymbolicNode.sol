// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title NEØ Protocol — Symbolic Node Marker
/// @notice Minimal symbolic contract to mark node presence on-chain
/// @dev This is a MARKER, not governance. Events are permanent truth.

contract NeoSymbolicNode {

    bytes32 public constant PROTOCOL_ID = keccak256(unicode"NEØ_PROTOCOL");

    enum NodeType {
        DESIGNER
    }

    struct NodeSignature {
        address nodeAddress;
        NodeType nodeType;
        uint256 timestamp;
        bool signed;
    }

    mapping(address => NodeSignature) public nodes;

    event NodeSymbolicallySigned(
        address indexed node,
        uint8 indexed nodeType,
        bytes32 indexed protocolId,
        uint256 timestamp
    );

    function signAsNode(NodeType _nodeType) external {
        require(!nodes[msg.sender].signed, "Already signed");

        nodes[msg.sender] = NodeSignature({
            nodeAddress: msg.sender,
            nodeType: _nodeType,
            timestamp: block.timestamp,
            signed: true
        });

        emit NodeSymbolicallySigned(
            msg.sender,
            uint8(_nodeType),
            PROTOCOL_ID,
            block.timestamp
        );
    }

    function isNode(address _address) external view returns (bool) {
        return nodes[_address].signed;
    }
}
