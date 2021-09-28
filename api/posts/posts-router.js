// implement your posts router here
const express = require('express');
const postsFunctions = require('./posts-model')
const postsRouter = express.Router();



postsRouter.get('/', async (req, res)=>{
    try{
         const posts = await postsFunctions.find()
         res.status(201).json(posts)
    }
    catch(err){
        res.status(500).json({ 
            message: "The posts information could not be retrieved" 
        })
    }
})


module.exports = postsRouter;