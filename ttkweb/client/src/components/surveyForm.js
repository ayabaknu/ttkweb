import React,{Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import SurveyField from './surveyField'
import {Link} from 'react-router-dom'
import validateEmails from '../validateEmails'
import formFields from './formFields'
import _ from 'lodash'



class SurveyForm extends Component {
  
  renderFields(){
    return _.map(formFields,({label,name})=>{
      return(
        <Field key={name} component={SurveyField} type="text" name={name} label={label}/>
      )
    })
  }
  render(){
   
  return (
    <div>
      <form onSubmit={this.props.handleSubmit(this.props.onServeySubmit)}>
        {this.renderFields()}
      <Link to="/dashboard" className="red btn-flat right white-text">cancel</Link>
      <button type="submit" className="teal btn-flat white-text">next <i className="material-icons right">done</i></button>

      </form>
      </div>
  )
}}
function validate(values){
     const errors={}
     errors.Emails=validateEmails(values.Emails || '')

     _.each(formFields,({name})=>{
       if(!values[name]){
         errors[name]=`you must provide ${name}`
       }
     })
     return errors
}
export default reduxForm({
  validate,
  form:'surveyForm',
  destroyOnUnmount:false
})(SurveyForm)
