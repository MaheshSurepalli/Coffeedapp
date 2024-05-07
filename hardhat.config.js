require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia :{
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

//0x5DC19531A333CdB704F960F4bEcE715071562077
