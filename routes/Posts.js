const express = require('express');
const postsCtrl = require('../controllers/Posts')

const router = express.Router();

// GET /posts
router.get('/', postsCtrl.getPosts);
router.post('/', postsCtrl.createPosts);


module.exports = router;
