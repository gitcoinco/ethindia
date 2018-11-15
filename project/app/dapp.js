import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'react-bootstrap';

import Blockchain from './components/blockchain';

import './dapp.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     
    }
  }

  componentDidMount(){ 

  }

  render(){
    return (<div><h3>Converge Protocol - usablity solution for ethereum</h3>
    <p>Converge protocol is a integrable solution for wallets and any dapp which want to send mass transaction at ones.</p>
    <p>Our goal is to enable the feature of batching mutliple transactions into a single one</p>
    <p>The Batching of mutliple transaction into a merkel tree and store it offchain can provide feasible scalablity solution of Ethereum
    </p>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Blockchain">
          <Blockchain />
        </Tab>
     
      </Tabs>
    </div>);
  }
}

ReactDOM.render(<App></App>, document.getElementById('app'));
