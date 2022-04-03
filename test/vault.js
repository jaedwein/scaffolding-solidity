const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
	let vault;

	beforeEach(async () => {
		const Vault = await ethers.getContractFactory("Vault");
		vault = await Vault.deploy();
		await vault.deployed();
	});

	it("Total supply should start at 0", async function () {
		expect(await vault.getTotalSupply()).to.equal(0);
	});
	it("Total supply should be 5 after adding 5", async function () {
		expect(await vault.getTotalSupply()).to.equal(0);
		const addSupplyTx = await vault.addSupply(5);
		// wait until the transaction is mined
		await addSupplyTx.wait();
		expect(await vault.getTotalSupply()).to.equal(5);
	});
	it("Should revert if adding a negative number", async function () {
		expect(await vault.getTotalSupply()).to.equal(0);
		await expect(vault.addSupply(-2)).to.be.reverted;
		expect(await vault.getTotalSupply()).to.equal(0);
	});
	it("Should revert if adding zero", async function () {
		expect(await vault.getTotalSupply()).to.equal(0);
		await expect(vault.addSupply(0)).to.be.reverted;
		expect(await vault.getTotalSupply()).to.equal(0);
	});

	it("Should revert if quantity is greater than total supply", async function () {
		expect(await vault.getTotalSupply()).to.equal(0);
		await vault.addSupply(2);
		await expect(vault.removeSupply(3)).to.be.reverted;
		expect(await vault.getTotalSupply()).to.equal(2);
	});
});
