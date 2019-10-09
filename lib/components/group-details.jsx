// Imports
import React, { useState, useEffect } from 'react'
import {
  Divider, Grid, Header, Icon, Image, Message, Placeholder, Segment, Table,
} from 'semantic-ui-react'
import GroupMembers from './group-members'
import { getGroups } from '../api/actions'
import config from '../config'

/* eslint-disable-next-line react/prop-types */
const GroupDetails = ({ match: { params: { id: groupID } } }) => {
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!group) {
      setLoading(true)
      getGroups().then(({ status, message, data }) => {
        if (status === 'success') {
          setLoading(false)
          setError('')
          setGroup(data.find(({ id }) => `${id}` === `${groupID}`))
        } else {
          setLoading(false)
          setError(message)
          setGroup(null)
        }
      }).catch((errorMessage) => {
        setLoading(false)
        setError(errorMessage)
        setGroup(null)
      })
    }
  }, [])

  return (
    <Segment>
      <Header>
        <Icon name="users" />
        <Header.Content>Group Details</Header.Content>
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
      {!loading && !error && group && (
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={4} textAlign="center" verticalAlign="top">
              {(group.avatar || config.group.attrs.avatar.default) && (
                <Image
                  src={group.avatar || config.group.attrs.avatar.default}
                  verticalAlign="top"
                  centered
                  circular
                  size="small"
                />
              )}
            </Grid.Column>
            <Grid.Column width={12}>
              <Table basic="very">
                <Table.Body>
                  {Object.keys(group).map((key) => (config.group.attrs[key].visible ? (
                    <Table.Row key={key}>
                      <Table.Cell collapsing>
                        <strong>
                          {config.group.attrs[key].label}
                        </strong>
                      </Table.Cell>
                      <Table.Cell>{group[key] || '-'}</Table.Cell>
                    </Table.Row>
                  ) : null))}
                  <Table.Row>
                    <Table.Cell collapsing>
                      <strong>
                        {config.group.attrs.members.label}
                      </strong>
                    </Table.Cell>
                    <Table.Cell>
                      <GroupMembers groupMembers={group.members} />
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

export default GroupDetails
