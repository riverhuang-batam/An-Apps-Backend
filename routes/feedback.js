const express = require('express')
const router = express.Router()

const multer = require('multer')
const feedbackController = require('../controllers/feedback')
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
router.get('/', feedbackController.get_feedback_lists)
// router.get('/:petId', feedbackController. get_pet_detail)
router.post('/', upload.array("petImages", 10), feedbackController.post_feedback)
// router.delete('/',feedbackController.delete_all_post)
// router.delete('/:petId',feedbackController.delete_posted_pet)
// router.put('/:petId', upload.array("petImages", 10),feedbackController.update_posted_pet)
module.exports = router;