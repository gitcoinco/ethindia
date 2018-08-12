// var CounterApp = artifacts.require('CounterApp.sol')
var InvoiceApp = artifacts.require('InvoiceApp.sol')

module.exports = async function (deployer) {
  console.log('yoyo')
  await deployer.deploy(InvoiceApp)
  .then(() => console.log(InvoiceApp.address))
  // deployer.deploy(CounterApp)
}
