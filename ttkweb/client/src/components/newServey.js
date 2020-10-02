import React,{Component} from 'react'
import SurveyForm from './surveyForm'
import Review from './Review'
import {reduxForm} from 'redux-form'
class NewSurvey extends Component {

 state={showReview:false}
  renderContent(){
    if(this.state.showReview){
      return <Review onCancel={()=> this.setState({showReview:false})}/>
    }
    return <SurveyForm onServeySubmit={()=> this.setState({showReview:true})}/>       

   }

  render(){
   return (
    <div>
    {this.renderContent()}
    </div>
  )
}}

export default reduxForm({
  form:'surveyForm'
})(NewSurvey)
