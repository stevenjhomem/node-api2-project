// implement your posts router here
const express = require('express');
const postsFunctions = require('./posts-model')
const postsRouter = express.Router();


//tests 1 and 2//
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
//tests 1 and 2//

//tests 3 and 4//
postsRouter.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const idPost = await postsFunctions.findById(id);
        if(!idPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
        else{
            res.status(201).json(idPost)
        }
    }
    catch(err){
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
})
//tests 3 and 4//


module.exports = postsRouter;