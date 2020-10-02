import React from 'react'
import {connect} from 'react-redux'
import formFields from './formFields'
import * as actions from '../actions'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'

function Review({onCancel,formValues,submitSurvey,history}) {
  const displayFields= _.map(formFields,field=>{
    return(
      <div key={field.name}>
      <label>{field.label}</label>
         <div>
           {formValues[field.name]}
         </div>
      </div>

    )
  })
  return (
    <div>
      <h1>please confirm the form.</h1>
       {displayFields}
       <button className="yellow darken-3 btn-flat right white-text" onClick={onCancel}>back</button>
       <button onClick={()=>submitSurvey(formValues,history)} className="green btn-flat white-text ">
         send survey<i className="material-icons right">email</i>
         </button>
    </div>
  )
}

function mapStateToProps(state){
  return{
   formValues:state.form.surveyForm.values
  }
}

export default connect(mapStateToProps,actions)(withRouter(Review))