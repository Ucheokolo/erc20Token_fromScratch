import { ethers } from "hardhat";

async function main() {
    const [owner, acct1, acct2] = await ethers.getSigners();
    const ercToken = await ethers.getContractFactory("ERC20");
    const Erctoken = await ercToken.deploy("mumuToken", "MJ");
    await Erctoken.deployed();
    console.log(`contract address is ${Erctoken.address}`);

    //interact with contract
    console.log("///////////// owner address //////////////")
    console.log(owner.address);

    const amount = ethers.utils.parseEther('100');

    const ownerBal = await Erctoken.balanceOf(owner.address);
    console.log(`balance before mint is ${ownerBal}`);


    await Erctoken.mint(owner.address, amount);

    const ownerBalafter = await Erctoken.balanceOf(owner.address);
    console.log(`balance after mint is ${ownerBalafter}`);

    console.log("///////////// transfer funds //////////////")
    const acct1Balb4 = await Erctoken.balanceOf(acct1.address);
    console.log(`balance before tx ${acct1Balb4}`);

    const txamount = ethers.utils.parseEther('5');
    await Erctoken.transfer(acct1.address, txamount);

    const acct1Balafter = await Erctoken.balanceOf(acct1.address);
    console.log(`balance after tx ${acct1Balafter}`);

    const ownerBalaftertx = await Erctoken.balanceOf(owner.address);
    console.log(`balance after tx is ${ownerBalaftertx}`);

    console.log("///////////// Approve transferFrom funds //////////////")

    await Erctoken._allowance(owner.address, acct1.address);
    await Erctoken._approve(acct1.address, txamount);
    console.log("good!!!");


    console.log("///////////// transferFrom funds //////////////");
    const ownerb4 = await Erctoken.balanceOf(owner.address);
    const acct2Balb4 = await Erctoken.balanceOf(acct2.address);
    console.log(`balance before owner ${ownerb4} and balance before acct2 ${acct2Balb4}`);
    const txamount1 = ethers.utils.parseEther('2');
    await Erctoken.connect(acct1).transferFrom(owner.address, acct2.address, txamount1);

    const ownerb = await Erctoken.balanceOf(owner.address);
    const acct2af = await Erctoken.balanceOf(acct2.address);
    console.log(`balance after owner ${ownerb} and balance after acct2 ${acct2af}`);





}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})

// 0x5FbDB2315678afecb367f032d93F642f64180aa3