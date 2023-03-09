const express =require('express')


const {
    getSearch
    
    
}=require('../controllers/SearchApiController')

const router =express.Router()

router.get('/',getSearch)

module.exports = router
