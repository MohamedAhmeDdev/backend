const express =require('express')


const {createInformation}=require('../controllers/HelpCenterController')

const router =express.Router()

router.post('/',createInformation)

module.exports = router
