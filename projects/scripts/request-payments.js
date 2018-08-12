const RequestNetwork = require('@requestnetwork/request-network.js');
// const CONF = {
//   NETWORK: 'development',
//   NETWORK_ID: 6778
// }

const CONF = {
  NETWORK: 'rinkeby',
  NETWORK_ID: 4
}

class RequestNetworkClient {
  constructor(provider, ethNetworkId, useIpfsPublic = false) {
    this.provider = provider;
    this.requestNetwork = new RequestNetwork.default({provider, ethNetworkId, useIpfsPublic});
  }

  async generatePaymentRequestLink(payeeAddresses, amounts, payer) {
    const request = await this.requestNetwork.requestEthereumService.createRequestAsPayee(
      payeeAddresses,
      amounts,
      payer
    );
    request.request.currencyContract = '0xd1E039FdC422dfF41a6D47faaBB8E6b5066573F4';
    return request;
  }

  async generatePaymentRequestLink2(payeeAddresses, amounts, payer) {
    const signedRequest = await this.requestNetwork.requestEthereumService.signRequestAsPayee(
      payeeAddresses,
      ['185000000000000000'],
      new Date().getTime() + 3600, // we put expiration after 1 hour here
      payeeAddresses,
      JSON.stringify({order: 'bla'}),
    );
    // signedRequest.currencyContract = '0xd88ab9b1691340e04a5bbf78529c11d592d35f57';
    return signedRequest;
  }
}

module.exports = RequestNetworkClient;

// const provider = truffle_config.networks[CONF.NETWORK].provider();
// const requestNetwork = ;

// async function generatePaymentRequestLink() {
//   const payeeAddress = provider.getAddress(0);
//   console.log(`using ${payeeAddress} as payeeAddress`);
  
//   const requestData = { reason: 'Payment to atvanguard', orderId: '030890' };
  
//   const signedRequest = await requestNetwork.requestEthereumService.signRequestAsPayee(
//     [payeeAddress],
//     ['185000000000000000'],
//     new Date().getTime() + 3600, // we put expiration after 1 hour here
//     [payeeAddress],
//     JSON.stringify(requestData),
//   );
//   // signedRequest.currencyContract = '0xd88ab9b1691340e04a5bbf78529c11d592d35f57';
//   console.log(signedRequest);

//   const qs = JSON.stringify({
//     signedRequest: signedRequest,
//     callbackUrl: 'https://rinkeby.etherscan.io/tx/', // redirect to rinkeby tx page
//     networkId: CONF.NETWORK_ID});
//   const qsBase64 = Buffer.from(qs).toString('base64')
//   const qsb64Encoded = encodeURIComponent(qsBase64);
//   console.log('https://app.request.network/#/pay-with-request/' + qsb64Encoded);
// }

// module.exports = async function(callback) {
//   await generatePaymentRequestLink();
//   callback();
// }