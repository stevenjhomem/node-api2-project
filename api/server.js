//Imports
const express = require('express');
const postsRouter = require('./posts/posts-router.js')

//Instance of Express App
const server = express();


server.use('/api/posts', postsRouter);//Sets the root URL as /api/posts for the function. So, inside of my postsRouter function, the root URL "/" will be equivalent to /api/posts.


//Global Middleware
server.use(express.json());//teaches express to parse request bodies as JSON//

//Exposing the server to other modules
module.exports = server;
