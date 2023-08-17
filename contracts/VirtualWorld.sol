// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VirtualWorld is Initializable {
    struct Avatar {
        string name;
        uint256 x;
        uint256 y;
    }

    mapping(address => Avatar) public avatars;

    event AvatarMoved(address indexed avatarOwner, uint256 newX, uint256 newY);

    function initialize() public initializer {
        // Initialization function if needed
    }

    function createAvatar(string memory _name, uint256 _x, uint256 _y) external {
        require(bytes(_name).length > 0, "Avatar name cannot be empty");
        require(avatars[msg.sender].x == 0 && avatars[msg.sender].y == 0, "Avatar already exists");

        avatars[msg.sender] = Avatar(_name, _x, _y);
    }

    function moveAvatar(uint256 _newX, uint256 _newY) external {
        Avatar storage avatar = avatars[msg.sender];
        require(bytes(avatar.name).length > 0, "Avatar does not exist");

        avatar.x = _newX;
        avatar.y = _newY;

        emit AvatarMoved(msg.sender, _newX, _newY);
    }

    function getAvatarPosition(address _avatarOwner) external view returns (uint256, uint256) {
        Avatar storage avatar = avatars[_avatarOwner];
        require(bytes(avatar.name).length > 0, "Avatar does not exist");

        return (avatar.x, avatar.y);
    }
}
