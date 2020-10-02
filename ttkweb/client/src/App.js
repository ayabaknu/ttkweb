import React,{Component} from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import SurveyList from './components/surveyList';
import NewSurvey from './components/newServey';
import Header from './components/header';
import Products from './components/products';
import Cart from './components/cart';
import {connect} from 'react-redux'
import * as actions from './actions'
import './css/main.scss';

class App extends Component {

  componentDidMount(){
    this.props.fetchUser()
    this.props.fetchProducts()

  } 
        
render(){

  return (
    <div className="container">

     <BrowserRouter>

     <Header/>
     <Switch>
       <Redirect exact path="/" to="/home"/>
       <Route path="/home" component={Products}/>
       <Route path="/cart" component={Cart}/>
       <Route path="/surveyList" component={SurveyList}/>
       <Route path="/newServey" component={NewSurvey}/>
     </Switch>

     </BrowserRouter>
   </div>
     
  );}
}
export default connect(null,actions)(App);
