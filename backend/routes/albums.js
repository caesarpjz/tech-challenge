const fs = require('fs')

const pathName = './database/albums.json'

// /albums/:username/:id/userAlbums
const getAssociatedAlbums = (request, response) => {
  const {username} = request.params
  const {id} = request.params

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get associated albums')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {
      return x.userId === id
    })

    response.status(200).json(filteredData)
  })
}

// /albums
const getAllAlbums = (request, response) => {
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get albums')
      throw err
    }

    const readData = JSON.parse(data)
    response.status(200).json(readData)
  })
}

// /albums/:username/:id/createAlbum
const postAlbum = (request, response) => {
  const {id} = request.params

  const {title} = request.body
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to create album')
      throw err
    }

    const readData = JSON.parse(data)
    const length = readData.length
    const newData = {
      "userId": id,
      "name": length + 1,
      "title": title
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

// /albums/:username/:id/deleteAlbum
const deleteAlbum = (request, response) => {
  const {username} = request.params
  const {id} = request.params

  const {album_id} = request.body
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to delete album')
      throw err
    }

    const readData = JSON.parse(data)
    const newData = readData.filter((x) => {return x.userId !== id && x.id !== album_id})
    fs.writeFile(pathName, newData, (err) => {
      if (err) {
        response.status(400).send('Unable to delete album')
        throw err
      }

      response.status(200).send("Album successfully deleted")
    })
  })
}
module.exports = {
  getAssociatedAlbums,
  getAllAlbums,
  postAlbum,
  deleteAlbum
}