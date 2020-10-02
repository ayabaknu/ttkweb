import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'


const Cart = ({updateCart, clearCart,stateCart}) => {
  let cart = JSON.parse(localStorage.getItem('cart'))
   let totalPrice = cart ? cart.reduce((total,currentItem)=>{
     return total + (currentItem.price*currentItem.quantity)
   },0):0;
 
   let changeQuantity=(event)=>{
     let id = event.target.dataset.id;
     let calc = event.target.dataset.calc
      updateCart(calc,id)
   }
 
   let clearAll=()=>{
     clearCart()
   }
   return (
    <div>
    <ul className="products-container">
    {cart? cart.map((product,index)=> <li key={index} className="product dfc">
      <div className="img-wrapper">
        <img src={product.image.url} alt="electronics and accessories"></img>
        <div className="purchase-description">
          <span className="quantity">{product.quantity}</span>
          <span className="price">${product.price * product.quantity}</span>
          <span className="plusMinus" >
          <i className="small material-icons" data-calc="plus" data-id={product.id} onClick={changeQuantity}>exposure_plus_1</i>
          <i className="small material-icons"  data-calc="minus" data-id={product.id} onClick={changeQuantity}>exposure_minus_1</i>
          </span>
        </div>
    </div>
    </li>):[]}
    </ul>
    <h3 className="total">total price:$ {totalPrice}</h3>
    <div className="btns-wrapper">
        <button className="signIn"><a href="/auth/google">sign in with Google</a></button>
        <button className="payment" disabled>complete payment</button>
        <button className="clear-cart" onClick={clearAll}>clear cart</button>

    </div>
    
    </div>
   )}

   function mapStateToProps(state){
    return { 
      stateCart:state.cart
    }
  }
  export default connect(mapStateToProps,actions)(Cart);
 