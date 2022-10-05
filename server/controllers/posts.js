import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMITPOST_PER_PAGE = 6;
        const startIndex = (Number(page) - 1) * LIMITPOST_PER_PAGE; // get the starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMITPOST_PER_PAGE).skip(startIndex);
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMITPOST_PER_PAGE) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        if(searchQuery) {
            var title = new RegExp(searchQuery, 'i'); // i means ignore case (Upper,Lower)
        } else {
            var title = null;
        }
        
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message }); 
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params; //rename id to _id
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    // index = -1 means not like post yet
    if(index === -1) {
        post.likes.push(req.userId); // like the post
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId)); // return all the like except current person like (remove current person like / dislike)
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}