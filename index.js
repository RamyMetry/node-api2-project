const express = require('express');
const server = express();
const postsRoutes = require('./data/appRoutes/posts.js');
var cors = require('cors');
server.use(express.json())


server.use(cors());
server.use('/api/', postsRoutes);


server.use((req,res)=>{
	res.status(404).send('we will fix it soon')
})


server.listen(5000, () => {
	console.log('API is working on port 5000');
});
