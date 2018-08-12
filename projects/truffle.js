// const HDWalletProvider = require ('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      // from: "0x627306090abab3a6e1400e9345bc60c78a8bef57",
      // provider: () => {
      //   return new HDWalletProvider('candy maple cake sugar pudding cream honey rich smooth crumble sweet treat', "http://localhost:8545");
      // },
      network_id: '8989'
    }
  }
}
