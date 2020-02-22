const express = require('express');
const server = express();
const postsRoutes = require('./data/appRoutes/posts.js');
var cors = require('cors');
server.use(express.json())
require("dotenv").config()


server.use(cors());
server.use('/',(req,res)=>{res.send(`<h1>${process.env.WELCOME}</h1>`)})
server.use('/api/', postsRoutes);


server.use((req,res)=>{
	res.status(404).send('we will fix it soon')
})


server.listen(5000, () => {
	console.log('API is working on port 5000');
});
