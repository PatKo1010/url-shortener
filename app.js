const express = require ('express')
const exphbs = require ('express-handlebars')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require ('body-parser')
const UrlModel = require ('./models/url')
const routes = require('./routes')

require('./config/mongoose')


app.engine ('hbs', exphbs ({extname:'hbs', defaultLayout:"main"}))
app.set ('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use (routes)

app.listen (port, () => {
  console.log (`Expense app is listening on ${port}`)
})
