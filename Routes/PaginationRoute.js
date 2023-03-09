const express =require('express')
const router =express.Router()
const {getHouses} =require('../controllers/PaginationController')

router.get('/houses',     getHouses)




module.exports = router
