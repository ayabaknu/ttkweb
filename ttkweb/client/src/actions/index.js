import axios from 'axios';
import {FETCH_USER,FETCH_SURVEYS,FETCH_PRODUCTS,ADD_TO_CART,UPDATE_CART, CLEAR_CART} from './types';
export const fetchUser =()=>{

    return async function(dispatch){
      const res= await axios.get('/api/current_user')
      dispatch({
        type:FETCH_USER,
        payload:res.data
      })}
  
  }

  export const handleToken=(token)=> async dispatch=>{
    const res = await axios.post('/api/stripe',token)
    dispatch({
      type:FETCH_USER,
      payload:res.data
    })
  }
  
export const fetchSurveys=()=> async dispatch=>{
  const res= await axios.get('/api/surveys')
  dispatch({type:FETCH_SURVEYS,payload:res.data})
}

export const submitSurvey = (values,history) =>async dispatch=>{
  const res= await axios.post('api/surveys',values)
  history.push('/surveys')
  dispatch({
    type:FETCH_USER,
    payload:res.data
  })
}

export const fetchProducts=()=> async dispatch=>{
  const response = await axios.get('api/prod')
  const products = await response.data
  localStorage.setItem('products',JSON.stringify(products))
  let storageProducts = JSON.parse(localStorage.getItem('products'))
  dispatch({
    type:FETCH_PRODUCTS,
    payload:storageProducts
  })
}

let cart=[]
export const addToCart=(id,stateProducts,storageCart)=>async dispatch=>{
    let selectedItem = stateProducts.find(item=>item.id === id)
    if(storageCart === null){
      cart.push(selectedItem)
      localStorage.setItem('cart',JSON.stringify(cart))
    }else{
      storageCart.push(selectedItem)
      localStorage.setItem('cart',JSON.stringify(storageCart))
      dispatch({
        type:ADD_TO_CART,
        payload:JSON.parse(localStorage.getItem('cart'))
      })
    }}

let updatedItem
export const updateCart=(calc,id)=> async dispatch =>{
  let cartStorage = JSON.parse(localStorage.getItem('cart'));
  let selectedItem = cartStorage.find(item=>item.id ===id)
  let indexNumber = cartStorage.indexOf(selectedItem)
  updatedItem = selectedItem
  if(calc==='plus'){
    updatedItem.quantity = selectedItem.quantity + 1
  }else{
    if(calc ==='minus'){
      updatedItem.quantity = selectedItem.quantity === 0 ? 0:selectedItem.quantity - 1
    }
  }
  cartStorage[indexNumber]= updatedItem
  localStorage.setItem('cart',JSON.stringify(cartStorage))
  dispatch({
    type:UPDATE_CART,
    payload: JSON.parse(localStorage.getItem('cart'))
  })
}

export const clearCart=()=> async dispatch=>{
  localStorage.removeItem('cart');
  dispatch({
    type:CLEAR_CART,
    payload:[]
  })
}