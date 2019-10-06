// Imports
import React from 'react'
import {
  Divider, Header, Icon, Segment,
} from 'semantic-ui-react'

const Users = () => (
  <Segment>
    <Header as="h2" icon textAlign="center">
      <Icon name="group" circular />
      <Header.Content>Groups</Header.Content>
      <Header.Subheader>
        Manage the groups&apos; attributes and users
      </Header.Subheader>
    </Header>
    <Divider />
  </Segment>
)

export default Users
