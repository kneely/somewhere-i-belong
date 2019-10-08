// Direct request handlers for the API endpoints
import faker from 'faker'
import api from './api'
import {
  fakeFetch, buildStateFromFields, writeToLS, readFromLS,
} from '../misc/helpers'
import config from '../config'

const genFakeUsers = () => {
  let users = []
  if (config.useFaker) {
    users = readFromLS('users') || []
    if (!users.length) {
      const total = config.numFakeUsers
      for (let i = 0; i < total; i += 1) {
        users.push({
          id: i + 1,
          avatar: faker.image.avatar(),
          username: faker.internet.userName(),
          fullName: faker.name.findName(),
          email: faker.internet.email(),
        })
      }
      writeToLS('users', users)
    }
  }
  users = readFromLS('users') || []
  return {
    status: 'success',
    message: '',
    data: users,
  }
}

const createFakeDBUser = (jsonData) => {
  const fields = Object.keys(config.user.attrs)
  const userObj = buildStateFromFields(fields, config.user.attrs)
  const jsonKeys = Object.keys(jsonData)
  jsonKeys.forEach((key) => {
    userObj[key] = jsonData[key]
  })
  const users = readFromLS('users') || []
  userObj.id = users.length + 1
  users.push(userObj)
  writeToLS('users', users)
}

const createFakeUser = (url, { body }) => {
  if (body) {
    const jsonData = JSON.parse(body)
    const jsonKeys = Object.keys(jsonData)
    if (jsonKeys.length) {
      const emptyValues = jsonKeys.reduce((acc, key) => (jsonData[key] ? 0 : acc + 1), 0)
      if (emptyValues === 0) {
        createFakeDBUser(jsonData)
        return {
          status: 'success',
          message: '',
          data: [],
        }
      }
    }
  }
  return {
    status: 'error',
    message: 'no data received',
    data: [],
  }
}

const editFakeDBUser = (userObj) => {
  if (userObj && userObj.id) {
    const users = readFromLS('users') || []
    const pos = users.findIndex((user) => user && user.id === userObj.id)
    if (pos > -1) {
      users[pos] = userObj
    }
    writeToLS('users', users)
  }
}

const editFakeUser = (url, { body }) => {
  if (body) {
    const jsonData = JSON.parse(body)
    const jsonKeys = Object.keys(jsonData)
    if (jsonKeys.length) {
      editFakeDBUser(jsonData)
      return {
        status: 'success',
        message: '',
        data: [],
      }
    }
  }
  return {
    status: 'error',
    message: 'no data received',
    data: [],
  }
}

const deleteFakeDBUser = (userID) => {
  if (userID) {
    const users = readFromLS('users') || []
    if (users.length) {
      const pos = users.findIndex((user) => user && user.id === userID)
      if (pos > -1) {
        users.splice(pos, 1)
        writeToLS('users', users)
      }
    }
  }
}

const deleteFakeUser = (url, { body }) => {
  if (body) {
    const jsonData = JSON.parse(body)
    const jsonKeys = Object.keys(jsonData)
    if (jsonKeys.includes('userID')) {
      const { userID } = jsonData
      deleteFakeDBUser(userID)
      return {
        status: 'success',
        message: '',
        data: [],
      }
    }
  }
  return {
    status: 'error',
    message: 'no data received',
    data: [],
  }
}

const getUsers = () => fakeFetch(
  api.users.read.url, { ...api.users.read.opts, handlerFn: genFakeUsers },
)

const createUser = (data) => fakeFetch(
  api.users.create.url,
  { ...api.users.create.opts, handlerFn: createFakeUser, body: JSON.stringify(data) },
)

const editUser = (data) => fakeFetch(
  api.users.create.url,
  { ...api.users.create.opts, handlerFn: editFakeUser, body: JSON.stringify(data) },
)


const deleteUser = (data) => fakeFetch(
  api.users.create.url,
  { ...api.users.create.opts, handlerFn: deleteFakeUser, body: JSON.stringify(data) },
)

export {
  getUsers, createUser, editUser, deleteUser,
}
