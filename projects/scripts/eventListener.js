var InvoiceApp = require('../build/contracts/InvoiceApp.json');
var RequestNetworkClient = require('./request-payments');
var Web3 = require('web3');

var provider = new Web3.providers.HttpProvider('http://localhost:8545')
var web3 = new Web3("ws://localhost:8545");
// var web3 = new Web3(provider);

var requestNetworkClient = new RequestNetworkClient(provider, '8989');
contractAddress = '0x172615442a363404FE4CABF12eE7dfe5ED503521';
requestNetworkContractAddress = '0x35E415382647Ea72372EB02190c968eaa119A973';

var myContract = new web3.eth.Contract(
  InvoiceApp.abi,
  contractAddress
);

myContract.events.CreatePaymentRequestBackend({}, function(error, event){ console.log(event); })
// myContract.getPastEvents("allEvents", {}, function(error, event){ console.log(event); })
.on('data', async function(event){
  // event = events[0];
  console.log('in CreatePaymentRequestBackend event handler');
  console.log(event); // same results as the optional callback above
  // d = web3.eth.abi.decodeParameters(['string', 'uint256'], event.raw.data);
  // var d = web3.eth.abi.decodeLog([{type: 'string'}, {type: 'uint256'}], event.raw.data, event.raw.topics);
  // console.log('params', d, 'payer', d[0], 'amount', d[1]);
  // console.log(event.returnValues);
  let params = event.returnValues;
  // const payer = d[0];
  var r = await requestNetworkClient.generatePaymentRequestLink(
    // ['0xb4124cEB3451635DAcedd11767f004d8a28c6eE7', contractAddress],
    // ['0', web3.utils.toWei(event.returnValues.amount, 'ether')],
    ['0xb4124cEB3451635DAcedd11767f004d8a28c6eE7'],
    [params.amount],
    // ['185000000000000000'],
    // event.returnValues.payer,
    // '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb'
    params.payer
  );
  console.dir(r, {depth: null});
  console.log('setting request ID');

  await myContract.methods.setRequestId(event.returnValues.id, r.request.requestId).send({
    from: '0x306469457266CBBe7c0505e8Aad358622235e768'
  });

  // const signedRequest = r.request;
  // const signedRequest = r;
  // const qs = JSON.stringify({
  //   signedRequest: signedRequest,
  //   callbackUrl: 'https://rinkeby.etherscan.io/tx/', // redirect to rinkeby tx page
  //   networkId: '8989'});
  // const qsBase64 = Buffer.from(qs).toString('base64')
  // const qsb64Encoded = encodeURIComponent(qsBase64);
  // console.log('https://app.request.network/#/pay-with-request/' + qsb64Encoded);
})
.on('changed', function(event){
  // remove event from local database
})
.on('error', console.error);

myContract.events.PaymentCreated({}, function(error, event){ console.log(event); })
// myContract.getPastEvents("allEvents", {}, function(error, event){ console.log(event); })
.on('data', async function(event){
  // event = events[0];
  console.log('in PaymentCreated event handler');
  console.log(event);
})

myContract.events.PaymentFulfilled({}, function(error, event){ console.log(event); })
// myContract.getPastEvents("allEvents", {}, function(error, event){ console.log(event); })
.on('data', async function(event){
  // event = events[0];
  console.log('in paymentFulfilled event handler');
  console.log(event);
})

const requestNetworkArtifacts = require('requestNetworkArtifacts');
var artifact = requestNetworkArtifacts.default('private', requestNetworkContractAddress);
// console.log(artifact);
var reqCoreContract = new web3.eth.Contract(
  artifact.abi,
  requestNetworkContractAddress
);

reqCoreContract.events.Accepted({}, function(error, event){ console.log(event); })
// myContract.getPastEvents("allEvents", {}, function(error, event){ console.log(event); })
.on('data', async function(event) {
  console.log('in Accepted event handler');
  console.log(event);
  // propagate this to InvoiceApp
  await myContract.methods.paymentFulfilled(event.returnValues.requestId).send({
    from: '0x306469457266CBBe7c0505e8Aad358622235e768'
  });
})

myContract.events.FulfilledPayments({}, function(error, event){ console.log(event); })
.on('data', async function(event){
  console.log(event);
})