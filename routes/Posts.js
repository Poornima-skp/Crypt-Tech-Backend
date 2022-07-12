const express = require('express');
const postsCtrl = require('../controllers/Posts')

const router = express.Router();

// GET /posts
router.get('/', postsCtrl.getPosts);
router.post('/', postsCtrl.createPosts);
router.put('/:id', postsCtrl.updatePost);
router.delete('/:id', postsCtrl.deletePost);
router.put('/:id/likePost', postsCtrl.likePost)

module.exports = router;
