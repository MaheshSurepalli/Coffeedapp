const hre = require("hardhat");

async function main() {
    const Chai = await hre.ethers.getContractFactory("Chai");
    const chaiContract = await Chai.deploy();

    console.log("Deployed contract address: ", await chaiContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });