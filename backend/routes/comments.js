const fs = require('fs')

const pathName = './database/comments.json'

// /comments
const getAllComments = (request, response) => {
  
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get all comments')
      throw err
    }

    const readData = JSON.parse(data)

    // console.log(readData)
    response.status(200).json(readData)
    
  })
}

// /comments/specific?postId=__
const getAssociatedComment = (request, response) => {
  const {postId} = request.query

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get all comments')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {return x.postId === postId})

    response.status(200).json(filteredData)
    
  })
}

// /comments/:postId/deleteComment
const deleteComment = (request, response) => {
  const {postId} = request.params

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to delete comments')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {return x.postId !== postId})

    fs.writeFile(pathName, filteredData, (err) => {
      if (err) {
        response.status(400).send('Unable to delete comment')
        throw err
      }

      response.status(200).send("Comment successfully deleted")
    })
  })
}

// /comments/:postId/postComment
const postComment = (request, response) => {
  const {postId} = request.params

  const {name, email, body} = request.body
  
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to create comment')
      throw err
    }

    const readData = JSON.parse(data)
    const length = readData.length
    const newData = {
      "postId": postId,
      "id": length + 1,
      "name": name,
      "email": email,
      "body": body
    }

    readData.push(newData)

    fs.writeFile(pathName, JSON.stringify(readData), (err) => {
      if (err) {
        response.status(400).send('Unable to create album')
        throw err
      }

      response.status(200).json(readData)
    })
  })
}

module.exports = {
  getAllComments,
  getAssociatedComment,
  deleteComment,
  postComment
}