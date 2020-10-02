const keys= require('../config/keys');
const stripe= require('stripe')(keys.debkKey);
const requireLogin = require('../middleware/requireLogin')
module.exports = app =>{
    app.post('/api/stripe',requireLogin,async (req,res)=>{

      try{
        const charge= await stripe.charges.create({
          amount:500,
          currency:'usd',
          description:'charging for the service',
          source:req.body.id
        })
        
         req.user.credits += 5
         const user = await req.user.save();
         res.send(user)
      }catch(err){
        res.status(500).send('server error')
      }
      
    })
}