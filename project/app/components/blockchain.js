import EmbarkJS from 'Embark/EmbarkJS';
import Txbatch from 'Embark/contracts/Txbatch';
import StandardToken from 'Embark/contracts/StandardToken';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
 
class Blockchain extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        address: StandardToken.address,
        buffer : "",
        buffer2 : "",
        r : [],
        val : [],
        web3 : undefined
      }
    }




    handleAddressChange(e){
      this.setState({address: e.target.value})
    }

    handleEthereumValues(e){
      this.setState({buffer: e.target.value})
    }
  
    handleAmountValues(e){
      this.setState({buffer2: e.target.value})
    }

    mutliallow(e){
      e.preventDefault();
      let str = this.state.buffer
      console.log(str)
      let r = []
      let v = []
      let arr = str.split(",")
      let arr2 = this.state.buffer2.split(",")
      let sum = 0
      
      for(let i = 0; i<arr.length; i++){
        r.push(arr[i])
        v.push(arr2[i])
        sum+= arr2[i]  
      }
      this.setState({r : r})
      this.setState({v : v})
      StandardToken.approve( Txbatch.address, sum)
      console.log(this.state)
    }

    multisend(e){
    console.log(this.state.r)
    console.log(this.state.v)
    console.log(this.state.address)
    Txbatch.multisend(this.state.address , this.state.r, this.state.v)
    }

    getfull(e){
      console.log("Total Token Supply")
      StandardToken.totalSupply().then(supply => console.log(supply))
     
      StandardToken.balanceOf(["0x7D2262ADb3d47448bC09c79FA40800a8E8636724"]).then(e=>console.log("Balance of ad1  0x7D2262ADb3d47448bC09c79FA40800a8E8636724 :" + e))
     
      StandardToken.balanceOf(["0x58aa3b110Dee7bC14fCD61c6Aade0C7B7FbbbB80"]).then(e=>console.log("Balance of ad2 0x58aa3b110Dee7bC14fCD61c6Aade0C7B7FbbbB80 :" + e))
     
      StandardToken.balanceOf(["0x8AcEe242957B1A3c90Af0d3DEA2d8d2c9eb51359"]).then(e=>console.log("Balance of ad3 0x8AcEe242957B1A3c90Af0d3DEA2d8d2c9eb51359 :" + e))
     
      StandardToken.balanceOf(["0x0D1B5571a441175907CdbcffC506C43563e5A65C"]).then(e=>console.log("Balance of ad4 0x0D1B5571a441175907CdbcffC506C43563e5A65C :" + e))

      StandardToken.balanceOf(["0xB9fE399612637b23ad45F58cd6272BfB84659609"]).then(e=>console.log("Balance of ad5 0xB9fE399612637b23ad45F58cd6272BfB84659609:" + e))

      // StandardToken.allowance(["0x7D2262ADb3d47448bC09c79FA40800a8E8636724" , this.state.address] ).then(e=>console.log("Allowance :" + e))
      // StandardToken.allowance([ this.state.address, "0x7D2262ADb3d47448bC09c79FA40800a8E8636724"] ).then(e=>console.log("REAllowance :" + e))

      
    }
  
    render(){
      return (<React.Fragment>
        <h4>Input the tx info</h4>
          <Form inline>
            <FormGroup>
              <label>ERC20 Token address :  </label>
              <FormControl
                type="text"
                defaultValue={this.state.valueSet}
                onChange={(e) => this.handleAddressChange(e)} placeholder="<address>" />
              </FormGroup>

            
              <FormGroup controlId="formControlsTextarea">
              <label>Sending list :  </label>
             
              <FormControl componentClass="textarea" placeholder="<address>,<address>,<address> " onChange={(e) => this.handleEthereumValues(e)} />
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <label>Recpective Amount :  </label>
             
              <FormControl componentClass="textarea" placeholder="<amount>,<amount>,<amount> " onChange={(e) => this.handleAmountValues(e)} />
            </FormGroup>

          </Form>

          <hr />
          
          <h4> Allow the contract</h4>
          <Form inline>
            <FormGroup>
              <HelpBlock></HelpBlock>
              <Button bsStyle="primary" onClick={(e) => this.mutliallow(e)}>Allow</Button>
            </FormGroup>
          </Form>
          <hr />
          
          <h4> Send the batch</h4>
          <Form inline>
            <FormGroup>
              <HelpBlock>wait until the allowance is approved</HelpBlock>
              <Button bsStyle="primary" onClick={(e) => this.multisend(e)}>Send</Button>
               </FormGroup>
          </Form>
          <hr />
          <h4>Test Data :  </h4>
          <h5>(Open Console to Test)</h5>
          <h5>Check demo.txt to get demo data</h5>
          <Button bsStyle="primary" onClick={(e) => this.getfull(e)}>Test</Button>
          
          <p> contract address : {Txbatch.address} </p>
          <p> default erc20 address : {StandardToken.address} </p>
          
                 
         
      </React.Fragment>



      );
    }
  }

  export default Blockchain;
