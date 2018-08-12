import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  count: 0,
}

const initialState2 = {
  payments : [{id: 'dummypaymentId', state: 'Pending'}]
}
app.store(async (state, event) => {
  if (state === null) state = initialState2
  console.log('state', state)
  let rows = state.rows || [];
  let params = event.returnValues;
  switch (event.event) {
    case 'DummyEvent':
      console.log('DummyEvent', event)
      return state;
    case 'CreatePaymentRequest':
      console.log('in CreatePaymentRequest')
      rows.push({id: params.id, payer: params.payer, amount: params.amount, status: 'Pending'});
      return {rows}
    case 'FulfilledPayments':
      console.log('in FulfilledPayments');
      console.log(event)
      console.log(state.rows, state.rows[0]);
      // var state = {rows: [{id: "0", payer: "0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb", amount: "185", status: "Pending"}]}
      for(let i = 0; i < state.rows.length; i++) {
        console.log('in loop')
        console.log(state.rows[i]);
        console.log(parseInt(state.rows[i].id))
        console.log('in loop 2')
        console.log(params.payments)
        console.log('in loop 3')
        if (params.payments[parseInt(state.rows[i].id)] == '1') {
          state.rows[i].status = 'Fulfilled';
        }
      }
      return state;
    default:
      return state
  }
})

function getValue() {
  // Get current value from the contract by calling the public getter
  return new Promise(resolve => {
    app
      .call('value')
      .first()
      .map(value => parseInt(value, 10))
      .subscribe(resolve)
  })
}

module.exports = app;

// app.events()
// .on('data', function(event){
//   console.log(event); // same results as the optional callback above
// })
// .on('changed', function(event){
//   // remove event from local database
// })
// .on('error', console.error);
