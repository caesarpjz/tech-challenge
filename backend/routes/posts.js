const fs = require('fs')

const pathName = './database/posts.json'

// /posts
const getAllPosts = (request, response) => {
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get posts')
      throw err
    }

    const readData = JSON.parse(data)
    
    response.status(200).json(readData)

  })
}

// /posts/:username/:id
const getAssociatedUserIdPosts = (request, response) => {
  const {id} = request.params

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get associated user id photos')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {
      return x.userId === id
    })

    response.status(200).json(filteredData)
  })
}

// /posts/:username/:id/deletePosts
const deletePosts = (request, response) => {
  const {id} = request.params

  const {postId} = request.body

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get delete photos')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {
      return x.postId !== postId
    })

    fs.writeFile(pathName, filteredData, (err) => {
      if (err) {
        response.status(400).send('Unable to delete photos')
      }
    })
    response.status(200).send('Successfully deleted')
  })
}

module.exports = {
  getAllPosts,
  getAssociatedUserIdPosts,
  deletePosts
}