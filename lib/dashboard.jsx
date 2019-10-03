// Imports
import React from 'react'
import {
  BrowserRouter as Router, Link, Switch, Route,
} from 'react-router-dom'
import {
  Icon, Menu, Segment, Sidebar,
} from 'semantic-ui-react'
import ErrorBoundary from './error-boundary'

const Home = () => (
  <div>
    Hello, there !
  </div>
)

const routes = [
  {
    key: 'home',
    component: Home,
  },
]

const menu = [
  {
    text: 'Home',
    icon: 'home',
    as: Link,
    to: '/',
  },
]

const Dashboard = () => (
  <Router>
    <style>
      {`
        #app {
          height: 100%;
        }
        .ui.sidebar.visible ~ .pusher {
            width: calc(100% - 150px);
            height: 100%;
            overflow: auto;
        }
      `}
    </style>
    <div
      style={{
        position: 'relative',
        height: '100%',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Sidebar.Pushable basic as={Segment}>
        <Sidebar
          as={Menu}
          animation="uncover"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <Menu.Item header>
            <Icon name="user circle" />
            Anonymous
          </Menu.Item>
          {menu.map(({
            text, icon, as, to,
          }) => (
            <Menu.Item
              as={as}
              to={to}
              key={text}
            >
              <Icon name={icon} />
              {text}
            </Menu.Item>
          ))}
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            <ErrorBoundary>
              <Switch>
                {routes.map(({
                  key, path, exact, component,
                }) => (
                  <Route
                    key={key}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                ))}
              </Switch>
            </ErrorBoundary>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  </Router>
)

export default Dashboard
