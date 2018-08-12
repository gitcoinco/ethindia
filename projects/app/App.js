import React from 'react'
import {
  AragonApp,
  Button,
  Text,
  AppBar,
  observe,
  AppView,
  ContextMenu, ContextMenuItem,
  Table, TableHeader, TableRow, TableCell,
  SidePanel
} from '@aragon/ui'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'
import InvoiceSummary from './components/InvoiceSummary';
import NewInvoicePanelContent from './components/NewInvoicePanelContent';

class CreatePayment extends React.Component {
  render () {
    return (
      <div>
        <Button onClick={this.props.onDebug}>Debug</Button>
        <Button onClick={this.props.onRefresh}>Refresh</Button>
        <Button mode="strong" onClick={this.props.onCreatePayment}>Create Payment</Button>
      </div>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			createInvoiceVisible: false
		}
	}
  handleCreateInvoiceOpen = () => {
		this.setState({ createInvoiceVisible: true })
	}

	handleCreateInvoiceClose = () => {
		this.setState({ createInvoiceVisible: false })
  }
  
  render () {
    return (
      <AragonApp className="app">
        <AppBar title="Invoices" endContent=
          {<CreatePayment
              onDebug={() => this.props.app.dummyEvent()}
              // onCreatePayment={() => this.props.app.createPaymentRequest('0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb', '185')}
              onCreatePayment={this.handleCreateInvoiceOpen}
              onRefresh={() => this.props.app.refresh()}
          />}
        />
        <ObservedPayments observable={this.props.observable} />
        
        <SidePanel
          title="New Invoice"
          opened={this.state.createInvoiceVisible}
          onClose={this.handleCreateInvoiceClose}>
            <NewInvoicePanelContent app={this.props.app}/>
				</SidePanel>
      </AragonApp>
    )
  }
}

const ObservedPayments = observe(
  (state$) => state$,
  { rows: [] }
)(InvoiceSummary)