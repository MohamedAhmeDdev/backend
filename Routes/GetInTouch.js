const express =require('express')
const router =express.Router()
const {createGetInTouch,getNewsLetter,deleteContact} =require('../controllers/GetInTouchController')


router.post('/', createGetInTouch)
router.get('/contactUs', getNewsLetter)
router.delete('/:id',deleteContact)


module.exports=router