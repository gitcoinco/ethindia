import React from 'react'
import {
  AragonApp,
  Badge,
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
// // import Aragon, { providers } from '@aragon/client'
// import styled from 'styled-components'
// import AppLayout from './components/AppLayout'

class ObjectRow extends React.Component {
  invoiceClicked = () => {
    console.log("url is: " + this.props.url)
    const url = this.props.url
    window.open (url, '_blank')
  }
  constructor() {
    super();
  }
  render() {
    return (
      <TableRow>
        <TableCell>
            <Text>{this.props.id}</Text>
        </TableCell>
        <TableCell>
        <Text>{this.props.payer}</Text>
        </TableCell>
        <TableCell>
            {
            this.props.status == 'Pending' 
            ? 
            <Badge>Pending</Badge>
            :
            <Badge foreground = "#022600" background="#d4f9d1">Fulfilled</Badge>
            }
        </TableCell>
        <TableCell>
        <Text smallcaps>ETH {this.props.amount}</Text>
        </TableCell>
        <TableCell>
        <Button mode="outline" onClick={this.invoiceClicked} >
            link
        </Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default class InvoiceSummary extends React.Component {
  render () {
    var rows = [];
    for (var i = 0; i < this.props.rows.length; i++) {
        var row = this.props.rows[i];
        rows.push(<ObjectRow key={i} id={row.id} status={row.status} url = {row.url} amount={row.amount} payer= {row.payer}/>);
    }
    console.log('this.props', this.props);
    return (
      
              <Table
                header={
                  <TableRow>
                    <TableHeader title="ID" />
                    <TableHeader title="Payer" />
                    <TableHeader title="Status" />
                    <TableHeader title="Amount" />
                    <TableHeader title="Invoice" />
                  </TableRow>
                }
              >
                {rows}
              </Table>
    )
  }
}