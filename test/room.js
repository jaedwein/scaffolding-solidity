const { expect } = require("chai");
const { id } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Room", function () {
	let room;

	beforeEach(async () => {
		const Room = await ethers.getContractFactory("Room");
		room = await Room.deploy();
		await room.deployed();
	});

	// it("Initial array is empty", async function () {
	// 	expect((await room.getStudents()).length).to.equal(0);
	// });

	it("Add a student to the room", async function () {
		const addStudentTx = await room.addStudent("Javier", "Weinmeister");
		// wait until the transaction is mined
		await addStudentTx.wait();
	});

	it("Revert expected because student not found in array", async function () {
		const addStudentTx = await room.addStudent("Javier", "Weinmeister");
		// wait until the transaction is mined
		await addStudentTx.wait();
		await expect(room.findStudent(2)).to.be.reverted;
	});

	it("Find a student", async function () {
		const addStudentTx = await room.addStudent("Javier", "Weinmeister");
		// wait until the transaction is mined
		await addStudentTx.wait();
		await expect(room.findStudent(1)).not.to.be.reverted;
	});

	it("Random account tries to execute method", async () => {
		const signers = await ethers.getSigners();
		const otherSigner = signers[1];
		await expect(room.connect(otherSigner).addStudent("Javier", "Weinmeister")).to.be.revertedWith(
			"Only owner can execute this function"
		);
	});
	it("Owner account tries to execute method", async () => {
		const signers = await ethers.getSigners();
		const otherSigner = signers[0];
		await expect(room.connect(otherSigner).addStudent("Javier", "Weinmeister")).not.to.be.reverted;
	});
});
