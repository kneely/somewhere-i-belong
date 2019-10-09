// Imports
import React from 'react'
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom'
import {
  Button, Icon, Menu, Segment, Sidebar, Visibility,
} from 'semantic-ui-react'
import { routes, menu } from '../navigation'
import MenuItems from './menu-items'
import ErrorBoundary from './error-boundary'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      userID: 'Anonymous',
      sidebarVisible: true,
    }

    this.handleVisibilityUpdate = this.handleVisibilityUpdate.bind(this)
  }

  componentDidMount() {
    const { innerWidth, innerHeight, screen } = window
    const calculations = {
      width: (innerWidth > 0) ? innerWidth : screen.width,
      height: (innerHeight > 0) ? innerHeight : screen.height,
    }
    this.handleVisibilityUpdate(null, { calculations })
  }

  handleVisibilityUpdate(e, { calculations }) {
    const { width, height } = calculations
    const intWidth = parseInt(width, 10)
    const intHeight = parseInt(height, 10)
    const ratio = intHeight / intWidth
    const sidebarVisible = ratio < 1.6
    this.setState({ sidebarVisible })
  }

  render() {
    const { userID, sidebarVisible } = this.state
    return (
      <Router>
        <Visibility onUpdate={this.handleVisibilityUpdate}>
          <style>
            {`
              #app, #app > div {
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
                visible={sidebarVisible}
                width="thin"
              >
                <Menu.Item
                  header
                  onClick={() => this.setState({ sidebarVisible: !sidebarVisible })}
                >
                  <Icon name="user circle" />
                  {userID}
                </Menu.Item>
                <MenuItems items={menu} />
              </Sidebar>
              <Sidebar.Pusher>
                <Segment basic>
                  {!sidebarVisible && (
                    <Segment
                      basic
                      clearing
                      style={{ margin: '1em 0em', padding: 0 }}
                    >
                      <Button
                        icon="sidebar"
                        color="black"
                        floated="left"
                        onClick={() => this.setState({ sidebarVisible: !sidebarVisible })}
                      />
                      <Button
                        icon="user"
                        color="black"
                        floated="right"
                        content={userID}
                      />
                    </Segment>
                  )}
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
        </Visibility>
      </Router>
    )
  }
}

export default Dashboard
