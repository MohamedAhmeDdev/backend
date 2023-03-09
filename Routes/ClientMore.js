const express =require('express')
const router =express.Router()

const{ 
    CreateClientInfo,
    gettingClientInfo
} =require('../controllers/ClientDetails')


router.post('/', CreateClientInfo)
router.get('/appointment/:id', gettingClientInfo)

module.exports=router