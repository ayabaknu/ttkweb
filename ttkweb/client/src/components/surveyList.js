import React,{Component} from 'react'
import { connect } from 'react-redux'
import {fetchSurveys} from '../actions'


class SurveyList extends Component{
  componentDidMount(){
    this.props.fetchSurveys()
    // alert('shoping time is close')
  }
  renderSurvey=()=>{
      return this.props.surveys.reverse().map(survey=>{
        return (
        <div className="card blue-grey darken-1" key={survey._id}>
        <div className="card-content white-text">
          <span className="card-title">{survey.title}</span>
         <p>{survey.body}</p>
         <p className="right">sent on:{new Date(survey.dateSent).toLocaleDateString()}</p>
       </div>
       <div className="card-action">
         <span>Yes:{survey.yes}</span>
         <span href="">No:{survey.no}</span>

       </div>
      </div>
        )
      }
      )
  }
  render(){
 
  return (
    <div>
       {this.renderSurvey()}
     </div>
  )
}
}

function mapStateToProps({surveys}){
  return {surveys}
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList)
