const mongoose = require('mongoose');
const PostMessage = require('../models/PostMessage');
const { post } = require('../routes/Posts');

const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        // console.log(postMessages);

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post)
    try {
        await newPost.save();

        res.status(200).json(newPost)

    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id}, {new: true})

    res.json(updatedPost);
}

const deletePost = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post Deleted Successfully' })
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthorized'})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const likesClicked = await PostMessage.findById(id)

    const index = likesClicked.likes.findIndex((id) => id === String(req.userId));
    if(index === -1) {
        likesClicked.likes.push(req.userId)
    }else{
        likesClicked.likes = likesClicked.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, likesClicked, { new: true })

    res.json(updatedPost);
}


module.exports = { 
    getPosts,
    createPosts,
    updatePost, 
    deletePost,
    likePost
}