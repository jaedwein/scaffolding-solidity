//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Room {
    constructor() {
        owner = msg.sender;
    }

    struct Student {
        uint256 id;
        string name;
        string surname;
        bool isApproved;
        bool exists;
    }

    mapping(uint256 => Student) public id2Student;

    Student[] students;
    uint256 lastId = 0;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this function");
        _; //acá se ejecuta la función que usa el modifier
    }

    function addStudent(string memory _name, string memory _surname)
        public
        onlyOwner
    {
        //++lastId;
        Student memory student;
        student.name = _name;
        student.surname = _surname;
        student.isApproved = false;
        student.exists = true;
        id2Student[++lastId] = student;
    }

    function findStudent(uint256 _id) public view returns (Student memory) {
        require(id2Student[_id].exists);
        return id2Student[_id];
        //revert("Student not found");
    }
}
