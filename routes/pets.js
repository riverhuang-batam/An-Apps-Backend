const express = require('express')
const router = express.Router()

const multer = require('multer')
const petsController = require('../controllers/pets')
const checkAuth = require('../middleware/check-auth')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})
router.get('/', petsController.get_pet_lists)
router.get('/:petId', petsController. get_pet_detail)
router.post('/', upload.array("petImages", 10), petsController.post_pet)
router.delete('/',petsController.delete_all_post)
router.delete('/:petId',petsController.delete_posted_pet)
router.put('/:petId', upload.array("petImages", 10),petsController.update_posted_pet)
module.exports = router;