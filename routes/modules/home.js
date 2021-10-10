const express = require('express')
const router = express.Router()
const UrlModel = require('../../models/url')
const generateURL = require ('../../Utils/generateURL')


router.get('/', (req, res) => {
  res.render(`index`)
})

router.post('/', (req, res) => {
  const originURL = req.body.url

  console.log (process.env.)
  const shortURL =`http://localhost:3000/${generateURL()}`

  return UrlModel.find({ originURL: originURL })
    .lean()
    .then((url) => {
      if (url.length === 1) {
        res.render('index', { shortURL: url[0].shortURL })
      } else if (url.length === 0) {
        UrlModel.create({ originURL, shortURL })
          .then(() => res.render('index', { shortURL }))
          .catch(err => console.log(err))
      }
    })
    .catch((err) => { console.log(err) })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  UrlModel.find({ shortURL: `http://localhost:3000/${id}` })
    .then((url) => { res.redirect(`${url[0].originURL}`) })
    .catch((err) => { console.log(err) })
})

module.exports = router 
