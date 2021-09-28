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

//tests 5, 6, and 7//
postsRouter.post('/',(req,res)=>{
    const {title, contents} = req.body;

    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    else{
        postsFunctions.insert({title, contents})
        .then(({id}) => {
            return postsFunctions.findById(id)
        })
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(err =>{
            res.status(500).json({
                message: "There was an error while saving the post to the database"
        })
    })}})
//tests 5, 6, and 7//

//tests 8, 9, 10, and 11//
postsRouter.put('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const {title, contents} = req.body;
        
        const idPost = await postsFunctions.findById(id);
        
        
        if(!idPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
        else if(!title || !contents){
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        }
        else{
            const updatedPost = await postsFunctions.update(id, {title, contents})
            res.status(200).json(updatedPost)
        }
    }
    catch(err){
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
})
//tests 8, 9, 10, and 11//

//tests 12, 13, and 14//
postsRouter.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const deletedPost = await postsFunctions.remove(id);
        if(!deletedPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
        else{
            res.status(201).json(deletedPost)
        }
    }
    catch(err){
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})
//tests 12, 13, and 14//

//tests 15 and 16//
//tests 15 and 16//


module.exports = postsRouter;