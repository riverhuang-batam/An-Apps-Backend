const express = require('express')
const router = express.Router()

const multer = require('multer')
const categoryController = require('../controllers/category')
const checkAuth = require('../middleware/check-auth')
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './uploads/')
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname)
//     }
// })
// const upload = multer({storage: storage})
router.get('/', categoryController.get_category_lists)
// router.get('/:petId', categoryController. get_pet_detail)
router.post('/', categoryController.post_category)
// router.delete('/',categoryController.delete_all_post)
// router.delete('/:petId',categoryController.delete_posted_pet)
// router.put('/:petId',categoryController.update_posted_pet)
module.exports = router;