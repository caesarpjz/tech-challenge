const bcrypt = require('bcrypt')
const fs = require('fs')

const pathName = './database/users.json'

// /users/create
const createUserAccount = (request, response) => {
  const username = request.body.username
  const password = request.body.password
  const hashedPassword = bcrypt.hash(password, 10)
  const name = request.body.name

  const {email, address, phone, website} = request.body
  const {street, city, zipcode} = address
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to create user')
      throw err
    }

    const readData = JSON.parse(data)
    const length = readData.length
    const newData = {
      "id": length + 1,
      "name": name,
      "password": hashedPassword,
      "username": username,
      "email": email,
      "address": {
        "street": street,
        "city": city,
        "zipcode": zipcode,
      },
      "phone": phone,
      "website": website,
    }
    
    readData.push(newData)

    fs.writeFile(pathName, JSON.stringify(readData), (err) => {
      if (err) {
        response.status(400).send('Unable to create user')
        throw err
      }

      response.status(200).send('Succesfully created user')
    })

  })
}

// /users/:username/:id
const getUserProfile = (request, response) => {
  const {username, id} = request.body

  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get albums')
      throw err
    }

    const readData = JSON.parse(data)

    const filteredData = readData.filter((x) => {
      return x.username === username && x.id === id
    })

    response.status(200).json(filteredData)
  })
}

// /users/login
const login = (request, response) => {
  const {username, password} = request.params
  const hashedPassword = bcrypt.hash(password, 10)
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to login')
      throw err
    }

    const readData = JSON.parse(data)

    const auth = readData.filter((x) => {
      return x.username === username && x.password === hashedPassword
    })

    if (auth.length == 1) {
      response.status(200).send("Succesfully logged in")
    } else {
      response.status(400).send('Unable to login')
    }
  })
}

// /users
const getAllUsers = (request, response) => {
  fs.readFile(pathName, 'utf8', (err, data) => {
    if (err) {
      response.status(400).send('Unable to get all users')
      throw err
    }

    const readData = JSON.parse(data)

    response.status(200).json(readData)
  })
}
module.exports = {
  createUserAccount,
  getUserProfile,
  login,
  getAllUsers
}