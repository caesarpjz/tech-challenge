const fs = require('fs')

const pathName = './database/photos.json'

// /photos
const getAllPhotos = (request, response) => {

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get photos')
      throw err
    }

    const readData = JSON.parse(data)
    
    response.status(200).json(readData)
  })
}

// /photos/album/:albumId
const getAssociatedAlbumIdPhotos = (request, response) => {
  const {albumId} = request.params

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get associated photos')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {
      return x.albumId === albumId
    })
    response.status(200).json(filteredData)
  })
}

// /photos/albumTitle/:title
const getAssociatedTitlePhotos = (request, response) => {
  const {title} = request.params

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get associated photos')
      throw err
    }

    const readData = JSON.parse(data)
    const filteredData = readData.filter((x) => {
      return x.title === title
    })

    response.status(200).json(filteredData)
  })
}

module.exports = {
  getAllPhotos,
  getAssociatedAlbumIdPhotos,
  getAssociatedTitlePhotos
}