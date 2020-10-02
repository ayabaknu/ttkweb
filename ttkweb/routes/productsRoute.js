let prod = require('../prod')
module.exports = (app,products) =>{
  app.get('/api/prod', async (req,res)=>{
  // products.insert(prod);
   let allData = await products.find({})
   .exec(function(err, result) {
     if (err) {
      console.error(err);
       res.end()
       return
     } else {
         res.json(result)
     }
 });

})}