const express =require('express')


const {RequstingAtour}=require('../controllers/Details')
const {gettingClientInfo}=require('../controllers/ClientDetails')

const router =express.Router()

router.post('/tour',RequstingAtour)
router.get('/specificTourRequest',gettingClientInfo)

module.exports = router
