const express = require ('express')
const exphbs = require ('express-handlebars')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require ('body-parser')
const UrlModel = require ('./models/url')

require('./config/mongoose')


app.engine ('hbs', exphbs ({extname:'hbs', defaultLayout:"main"}))
app.set ('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

function generateURL () {
  let newURL = ''
  let string = 'abcdefghijklmnopqrstuvwxzy1234567890'
  for (let i = 1; i<=5; i++) {
    const randomNumber = Math.floor(Math.random() * string.length)
    newURL += string.slice(randomNumber,randomNumber+1)
  }
  return newURL
}

app.get ('/', (req, res) => {
  res.render (`index`)
})

app.post ('/', (req,res) => {
  const originURL = req.body.url
  const shortURL = `http://localhost:3000/${generateURL()}`
  return UrlModel.find ({originURL: originURL})
            .lean()
            .then((url) => { 
              if (url.length === 1) {
                res.render ('index', {shortURL:url[0].shortURL})
              } else if (url.length === 0){
                UrlModel.create ({originURL,shortURL})
                .then (() => res.render ('index', {shortURL}) )
                .catch (err => console.log (err))
                   }
                  })
            .catch ((err) => {console.log (err)})
})

app.get('/:id', (req,res) => {
  const id = req.params.id
  UrlModel.find ({shortURL:`http://localhost:3000/${id}`})
          .then ((url)=> {res.redirect(`${url[0].originURL}`)})
          .catch ((err) => {console.log (err)})
})

app.listen (port, () => {
  console.log (`Expense app is listening on ${port}`)
})
