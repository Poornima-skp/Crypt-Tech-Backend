const express = require('express');
const postsCtrl = require('../controllers/Posts')
const auth = require('../config/auth');

const router = express.Router();

// GET /posts
router.get('/', postsCtrl.getPosts);
router.post('/', auth, postsCtrl.createPosts);
router.put('/:id', auth, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.put('/:id/likePost', auth, postsCtrl.likePost)

module.exports = router;
