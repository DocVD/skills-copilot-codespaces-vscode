// Create web server.
// Create an array of comments.
// Create a route that returns all comments.
// Create a route that adds a new comment.
// Create a route that deletes a comment.
// Create a route that returns a single comment.
// Create a route that updates a comment.
// Create a route that returns all comments for a specific post.

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const comments = [
  { id: 1, comment: 'I love this post!', post: 1 },
  { id: 2, comment: 'This post is terrible.', post: 1 },
  { id: 3, comment: 'I agree, this post is terrible.', post: 2 }
];

// Returns all comments.
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Adds a new comment.
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Deletes a comment.
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1) {
    res.status(404).send('Comment not found.');
  } else {
    comments.splice(index, 1);
    res.status(204).send();
  }
});

// Returns a single comment.
app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found.');
  }
});

// Updates a comment.
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedComment = req.body;
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1) {
    res.status(404).send('Comment not found.');
  } else {
    comments[index] = updatedComment;
    res.json(updatedComment);
  }
});

// Returns all comments for a specific post.
app.get('/posts/:id/comments',
