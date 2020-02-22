const express = require('express');

const router = express.Router();
const db = require('../db.js');

router.post('/posts', (req, res) => {
	const { title, contents } = req.body;
	console.log(req.body);
	db
		.insert(req.body)
		.then((post) => {
			if (!title || !contents) {
				res.status(400).json({
					errorMessage: 'Please provide title and contents for the post.'
				});
			} else {
				res.status(201).json(post);
			}
		})
		.catch((err) =>
			res.status(500).json({
				error: 'There was an error while saving the post to the database'
			})
		);
});

router.post('/posts/:id/comments', (req, res) => {
	const { text } = req.body;
	const post_id = req.params.id;
	db.findPostComments(post_id).then((ID) => {
		if (!ID[0]) {
			console.log(ID);

			return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		} else {
			db
				.insertComment({ text, post_id })
				.then((comment) => {
					if (!text) {
						res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
					} else {
						res.status(201).json(comment);
					}
				})
				.catch((err) =>
					res.status(500).json({
						error: 'There was an error while saving the comment to the database'
					})
				);
		}
	});
});

router.get('/posts', (req, res) => {
	db
		.find()
		.then((posts) => res.json(posts))
		.catch((err) => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

router.get('/posts/:id', (req, res) => {
	db
		.findById(req.params.id)
		.then((post) => {
			if (!post[0]) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.json(post);
			}
		})
		.catch((err) => res.status(500).json({ error: 'The post information could not be retrieved.' }));
});

router.get('/posts/:id/comments', (req, res) => {
	db
		.findPostComments(req.params.id)
		.then((comments) => {
			console.log(comments);
			if (!comments[0]) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.json(comments);
			}
		})
		.catch((err) => res.status(500).json({ message: "The comments information couldn't be retriverd." }));
});

router.delete('/posts/:id', (req, res) => {
	db
		.remove(req.params.id)
		.then((post) => {
			if (post < 1) {
				res.status(404).json({ message: "The post with the specific id doesn't exist" });
			} else {
				res.json({ message: 'successfully deleted ' });
			}
		})
		.catch((err) => res.status(500).json({ message: "The post couldn't be removed" }));
});

router.put('/posts/:id', (req, res) => {
	const { title, contents } = req.body;
	db
		.update(req.params.id, req.body)
		.then((post) => {
			if (!post) {
				res.status(404).json({ message: "The post with the specific id doesn't exist." });
			} else if (!title || !contents) {
				res.status(400).json({
					message: 'Please provide the title and the contents for the post.'
				});
			} else {
				res.status(200).json(post);
			}
		})
		.catch((err) => res.status(500).json({ message: "the post couldn't be modified." }));
});

module.exports = router;
