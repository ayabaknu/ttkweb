import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import reduxThunk from 'redux-thunk'
import {createStore,applyMiddleware,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './reducers/authReducer'
import surveyReducer from './reducers/surveyReducer'
import productsReducer from './reducers/productsReducer'
import cartReducer from './reducers/cartReducer'

const rootReducer= combineReducers({
  auth:authReducer,
  form:formReducer,
  surveys:surveyReducer,
  products:productsReducer,
  cart:cartReducer
})

const store= createStore(rootReducer,applyMiddleware(reduxThunk))
ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
