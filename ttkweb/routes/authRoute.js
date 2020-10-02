const passport= require('passport')
module.exports= (app)=>{

  app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
  }))
  
  app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
   res.redirect('/surveyList')})
    
  app.get('/api/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  
    // logout function is given by passport
  })
  app.get('/api/current_user', (req,res)=>{
    res.send(req.user)
  })
}