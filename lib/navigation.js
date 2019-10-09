// Defines the dashboard's navigation and content
import { Link } from 'react-router-dom'
import Home from './components/home'
import Users from './components/users'
import UserDetails from './components/user-details'
import GroupDetails from './components/group-details'
import Groups from './components/groups'

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
  {
    key: 'group',
    path: '/groups/:id',
    component: GroupDetails,
    exact: true,
  },
]

navigation.menu = menu
navigation.routes = routes

export default navigation

export { menu, routes }
