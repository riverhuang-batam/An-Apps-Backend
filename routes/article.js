const express = require('express')
const router = express.Router()

const multer = require('multer')
const articlesController = require('../controllers/article')
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
router.get('/', articlesController.get_article_lists)
// router.get('/:articleId', articlesController. get_pet_detail)
router.post('/', upload.array("petImages", 10), articlesController.post_article)
// router.delete('/',articlesController.delete_all_post)
// router.delete('/:articleId',articlesController.delete_posted_pet)
// router.put('/:articleId',articlesController.update_posted_pet)
module.exports = router;