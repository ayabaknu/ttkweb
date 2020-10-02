import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

function Products({stateProducts,stateCart,addToCart}){
  const checkCart = (event)=>{
    let btn = event.target;
    let id = btn.dataset.id;
    let storageCart = JSON.parse(localStorage.getItem('cart'))
    let inCart = storageCart ? storageCart.find(item => item.id === id) :null
    if(!inCart){
      addToCart(id,stateProducts,storageCart)
      btn.textContent = 'In Cart';
    }}
  return (
    <ul className="products-container">
    {stateProducts.map((product,index)=> <li key={index} className="product dfc">
      <div className="img-wrapper">
        <img src={product.image.url} alt="electronics and accessories"></img>
      <button className="add-button" onClick={checkCart} data-id={product.id}>add to cart</button>
      <div className="name-and-price">
        <span className="item-name">{product.name}</span>
        <span>${product.price}</span>
      </div>
    </div>
    </li>)}
    </ul>
  )
}
function mapStateToProps(state){
  return { 
    stateProducts:state.products,
    stateCart:state.cart
  }
}

export default connect(mapStateToProps,actions)(Products);
