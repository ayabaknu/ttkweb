import React,{Component} from 'react'
import ReactStripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Payment extends Component{
  render(){
    return(

      <ReactStripeCheckout amount={500} token={token=>this.props.handleToken(token)} 
      description="fill the survey please!"
      name="shoping time is closed"
      stripeKey={process.env.REACT_APP_PK_KEY}/>
      // stripe is using usa currency, 500 cents= 5 dollar

    )
    }}

    export default connect(null,actions)(Payment);