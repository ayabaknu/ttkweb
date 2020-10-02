const _ = require('lodash');
const path=require('path-parser').default
const {URL} = require('url')
const requireLogin= require('../middleware/requireLogin');
const requireCredit= require('../middleware/requireCredit');
const Survey = require('../models/Survey');
const Mailer= require('../service/mailer');
const surveyTemplate = require('../service/serveyTemplate');
module.exports= app=>{
  app.get('/api/serveys/:surveyId/:choice',(req,res)=>{
    res.send('Thank you for voting!')
  })
  
  app.get('/api/surveys',requireLogin,async (req,res)=>{
    const surveys = await Survey.find({_user:req.user.id}).select({recipients:false})
    res.send(surveys)
  })

  app.post('/api/surveys/webhooks', (req,res)=>{
    const p = new path('/api/serveys/:surveyId/:choice')
    _.chain(req.body)
    .map(({email,url})=>{
    const match=  p.test( new URL (url).pathname)

      if(match){
        return{email,surveyId:match.surveyId,choice:match.choice}
      }
    })
    .compact()
    .uniqBy('email','surveyId')
    .each(({surveyId,email,choice})=>{
      Survey.updateOne({
        _id:surveyId,
        recipients:{
          $elemMatch:{email:email,responded:false}
        }
      },{
        $inc:{[choice]:1},
        $set:{'recipients.$.responded':true},
        lastResponded:new Date()
      }
      ).exec()
    })
    .value()
    res.send({})
  })

  app.post('/api/surveys',requireLogin,requireCredit,async (req,res)=>{
     const {title,subject,body,Emails}= await req.body
     const survey= new Survey({
       title,
       body,
       subject,
       recipients: Emails.split(',').map(email => ({ email: email.trim() })), 
       _user:req.user.id,
       dateSent:Date.now()
  });
  try{

  const mailer= new Mailer(survey,surveyTemplate(survey));

  await mailer.send();
  await survey.save();
  req.user.credits -= 1;
  const user= await req.user.save();
  res.send(user);
  }catch(err){
    res.status(422).send(err)
  }
})}