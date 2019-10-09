// Imports
import React, { useState, useEffect } from 'react'
import {
  Divider, Grid, Header, Icon, Image, Message, Placeholder, Segment, Table,
} from 'semantic-ui-react'
import UserGroups from './user-groups'
import { getUsers } from '../api/actions'
import config from '../config'

/* eslint-disable-next-line react/prop-types */
const UserDetails = ({ match: { params: { id: userID } } }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      setLoading(true)
      getUsers().then(({ status, message, data }) => {
        if (status === 'success') {
          setLoading(false)
          setError('')
          setUser(data.find(({ id }) => `${id}` === `${userID}`))
        } else {
          setLoading(false)
          setError(message)
          setUser(null)
        }
      }).catch((errorMessage) => {
        setLoading(false)
        setError(errorMessage)
        setUser(null)
      })
    }
  }, [])

  return (
    <Segment>
      <Header>
        <Icon name="user" />
        <Header.Content>User Details</Header.Content>
      </Header>
      <Divider hidden />
      {loading && (
        <Placeholder fluid>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      )}
      {error && (
        <Message
          negative
          content={`Error: ${error}`}
        />
      )}
      {!loading && !error && user && (
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={4} textAlign="center" verticalAlign="top">
              {user.avatar && (
                <Image src={user.avatar} verticalAlign="top" centered circular />
              )}
            </Grid.Column>
            <Grid.Column width={12}>
              <Table basic="very">
                <Table.Body>
                  {Object.keys(user).map((key) => (config.user.attrs[key].visible ? (
                    <Table.Row key={key}>
                      <Table.Cell collapsing>
                        <strong>
                          {config.user.attrs[key].label}
                        </strong>
                      </Table.Cell>
                      <Table.Cell>{user[key]}</Table.Cell>
                    </Table.Row>
                  ) : null))}
                  <Table.Row>
                    <Table.Cell collapsing>
                      <strong>
                        {config.user.attrs.groups.label}
                      </strong>
                    </Table.Cell>
                    <Table.Cell>
                      <UserGroups userGroups={user.groups} />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Segment>
  )
}

export default UserDetails
