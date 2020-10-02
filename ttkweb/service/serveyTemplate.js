const keys= require('../config/keys')
module.exports= (survey)=>{
  return `
  <html>
  <body>
  <h1>tell us your opinion please</h1>
  ${survey.body}
  <div><a href='${keys.redirect}/api/serveys/${survey.id}/yes'>yes</a></div>
  <div><a href='${keys.redirect}/api/serveys/${survey.id}/no'>No</a></div>

  </body>
  </html>
  `
}