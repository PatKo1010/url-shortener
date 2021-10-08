const express = require ('express')
const { model } = require('../config/mongoose')
const router = express.Router()
const home = require ('./modules/home')

router.use ('/', home)


module.exports = router