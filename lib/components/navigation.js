// Defines the dashboard's navigation and content
import { Link } from 'react-router-dom'
import Home from './home'
import Users from './users'
import UserDetails from './user-details'
import Groups from './groups'

const navigation = {}

const menu = [
  {
    text: 'Home',
    icon: 'home',
    as: Link,
    to: '/',
  },
  {
    text: 'Users',
    icon: 'user',
    as: Link,
    to: '/users',
  },
  {
    text: 'Groups',
    icon: 'group',
    as: Link,
    to: '/groups',
  },
]

const routes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    key: 'users',
    path: '/users',
    component: Users,
    exact: true,
  },
  {
    key: 'user',
    path: '/users/:id',
    component: UserDetails,
    exact: true,
  },
  {
    key: 'groups',
    path: '/groups',
    component: Groups,
    exact: true,
  },
]

navigation.menu = menu
navigation.routes = routes

export default navigation

export { menu, routes }
