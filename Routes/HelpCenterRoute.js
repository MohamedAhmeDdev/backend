const express =require('express')


const {
    createInformation,
    getInfo
}=require('../controllers/HelpCenterController')

const router =express.Router()

router.post('/',createInformation)
router.get('/helpCenter',getInfo)


module.exports = router
