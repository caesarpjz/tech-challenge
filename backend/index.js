const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || "8000";

const albumsDb = require('./routes/albums')
const commentsDb = require('./routes/comments')
const photosDb = require('./routes/photos')
const postsDb = require('./routes/posts')
const usersDb = require('./routes/users');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.json({ info: 'Hello There! Welcome to Mavennet\'s Backend App' })
})

/* Users */

  //Get Users Account
  app
  .route('/users')
  .get(usersDb.getAllUsers)

  // Get User Profile
  app
  .route('/users/:username/:id')
  .get(usersDb.getUserProfile)

  // Login
  app
  .route('/users/login')
  .post(usersDb.login)

  // Create User Account
  app
  .route('/users/login')
  .post(usersDb.createUserAccount)

/* Albums */

  // Get Associated Albums
  app
  .route('/albums/:username/:id/userAlbums')
  .get(albumsDb.getAssociatedAlbums)

  // Get All Albums
  app
  .route('/albums')
  .get(albumsDb.getAllAlbums)

  // Post Albums
  app
  .route('/albums/:username/:id/createAlbum')
  .post(albumsDb.postAlbum)

  // Delete Albums
  app
  .route('/albums/:username/:id/deleteAlbum')
  .delete(albumsDb.deleteAlbum)


/* Comments */

  // Get all comments
  app
  .route('/comments')
  .get(commentsDb.getAllComments)

  // Get AssociatedComments
  app
  .route('/comments/specific')
  .get(commentsDb.getAssociatedComment)

  // Delete Comment
  app
  .route('/comments/:postId/deleteComment')
  .delete(commentsDb.deleteComment)

  // Post Comment
  app
  .route('/comments/:postId/postComment')
  .post(commentsDb.postComment)

/* Photos */

  // Get All Photos
  app
  .route('/photos')
  .get(photosDb.getAllPhotos)

  // Get Associated Albums Id
  app
  .route('/photos/album/:albumId')
  .get(photosDb.getAssociatedAlbumIdPhotos)

  // Get Associated Albums Title
  app
  .route('/photos/albumTitle/:title')
  .get(photosDb.getAssociatedTitlePhotos)

/* Posts */

  // Get all photos
  app
  .route('/posts')
  .get(postsDb.getAllPosts)

  // Get Associated User Id posts
  app
  .route('/posts/userId/:username/:id')
  .get(postsDb.getAssociatedUserIdPosts)

  // Delete posts
  app
  .route('/posts/:username/:id/deletePosts')
  .delete(postsDb.deletePosts)


/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app
