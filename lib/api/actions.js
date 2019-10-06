// Direct request handlers for the API endpoints
import faker from 'faker'
import api from './api'
import { fakeFetch } from '../misc/helpers'

const genFakeUsers = (num) => {
  const users = []
  const total = num || 100
  for (let i = 0; i < total; i += 1) {
    users.push({
      id: i + 1,
      avatar: faker.image.avatar(),
      fullName: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    })
  }
  return {
    status: 'success',
    message: '',
    data: users,
  }
}

const getUsers = () => fakeFetch(
  api.users.read.url, { ...api.users.read.opts, handlerFn: genFakeUsers },
)

export { getUsers }
