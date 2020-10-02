module.exports= (req,res,next)=>{
  if(!req.user){
    // if passport doesn't find the user return error
      return res.status(401).send({errr:'you must log in'})
  }
  next();
}