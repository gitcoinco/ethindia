import React from 'react';
// import logo from './logo.svg';
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Badge,
	AragonApp,
	Button,
	Text,
	AppBar,
	observe,
	ContextMenu, 
	ContextMenuItem,
  AppView,
  TextInput,
  Field,
	Table, TableHeader, TableRow, TableCell,
	SidePanel
} from '@aragon/ui'

export default class NewInvoicePanelContent extends React.Component {
  static defaultProps = {
    onCreateVote: () => {},
  }
  state = {
    payerAddress: '',
    invoiceAmount: '',
    invoiceDescription: ''
  }
  componentWillReceiveProps({ opened }) {
    if (opened && !this.props.opened) {
      // setTimeout is needed as a small hack to wait until the input's on
      // screen until we call focus
      this.payerAddressInput && setTimeout(() => this.payerAddressInput.focus(), 0)
    } else if (!opened && this.props.opened) {
      // Finished closing the panel, so reset its state
      this.setState({ ...initialState })
    }
  }

  handlePayerAddressChange = event => {
    this.setState({ payerAddress: event.target.value })
  }

  handleInvoiceAmountChange = event => {
    this.setState({ invoiceAmount: event.target.value })
  }

  handleInvoiceDescriptionChange = event => {
    this.setState({ invoiceDescription: event.target.value })
  }


  handleSubmit = event => {
    // this.props.app.createPaymentRequest('0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb', '185')
    this.props.app.createPaymentRequest(
      this.state.payerAddress,
      this.state.invoiceAmount)
    event.preventDefault()
    // this.props.onCreateVote(this.state.question.trim())
  }

  render() {
    const { payerAddress, invoiceAmount, invoiceDescription } = this.state
    return (
      <div>
        {/* <Form onSubmit={this.handleSubmit}> */}
        <Form onSubmit={this.handleSubmit}>
          <Field label="Payer Address">
            <TextInput
              innerRef={payerAddress => (this.payerAddressInput = payerAddress)}
              value={payerAddress}
              onChange={this.handlePayerAddressChange}
              required
              wide
            />
          </Field>

          <Field label="Amount">
            <TextInput.Number
              innerRef={invoiceAmount => (this.invoiceAmountInput = invoiceAmount)}
              value={invoiceAmount}
              onChange={this.handleInvoiceAmountChange}
              required
              wide
            />
          </Field>

          <Field label="Description">
            <TextInput
              innerRef={invoiceDescription => (this.invoiceDescriptionInput = invoiceDescription)}
              value={invoiceDescription}
              onChange={this.handleInvoiceDescriptionChange}
              required
              wide
            />
          </Field>



          <Button mode="strong" type="submit" wide>
            Submit Invoice
          </Button>
        </Form>
      </div>
    )
  }
}

const Form = styled.form`
  margin-top: 20px;
`

const Warning = styled(Text.Paragraph).attrs({
  size: 'xsmall',
})`
  margin-top: 10px;
  `