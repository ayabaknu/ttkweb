import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Payment from './payments';

class Header extends Component {  
  renderContent(){
  switch(this.props.auth){
    case null:
      return;
    case false:
      return  <div>
                <div className="yourCart right">
                  <span><Link to="/home">Home</Link></span>
                  <span><Link to="/cart">your Cart</Link></span>
                  <a href="/auth/google">sign in</a>
                  </div>
                <span className="logo-credit-text left">TTKWEB</span>
              </div>
    default:
      return  [
         <>
        <div className="left">
          <div className="logo-and-payment">
              <div className="stripe">
                <Payment/>
                <span className="logo-credit-text" key="2">credits:{this.props.auth.credits}</span>
              </div>
          </div>
        </div>

              <ul className="navigation right">
              <li key="4"><Link to="/surveyList">SurveyList</Link></li>
              <li key="5"><Link to="/newServey">NewServey</Link></li>
              <li key="3"><a href="/api/logout">Logout</a></li>
          </ul>
          
         </>

    ]

  }
}

  render(){
  return (
 <header>
  <nav className="header-nav">
    {this.renderContent()}
  </nav>
 </header>
  )}
}
function mapStateToProps(state){
  return {auth:state.auth}
}
export default connect(mapStateToProps)(Header)