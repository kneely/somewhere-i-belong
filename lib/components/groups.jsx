// Imports
import React from 'react'
import {
  Divider, Dropdown, Header, Icon, Input, Message, Placeholder, Segment,
} from 'semantic-ui-react'
import GroupsTable from './groups-table'
import AddNewGroup from './add-new-group'
import { getGroups } from '../api/actions'

class Groups extends React.Component {
  constructor() {
    super()

    this.state = {
      groups: [],
      filterValue: '',
      perPage: 10,
      isLoading: false,
      error: false,
      errorMessage: '',
    }

    this.getGroupData = this.getGroupData.bind(this)
  }

  componentDidMount() {
    this.getGroupData()
  }

  getGroupData() {
    this.setState({ isLoading: true }, () => {
      getGroups().then(({ status, message, data }) => {
        if (status === 'success') {
          this.setState({
            groups: data,
            isLoading: false,
            error: false,
            errorMessage: '',
          })
        } else {
          this.setState({
            groups: [],
            isLoading: false,
            error: true,
            errorMessage: message,
          })
        }
      }).catch((errorMessage) => {
        this.setState({
          isLoading: false,
          error: true,
          errorMessage,
        })
      })
    })
  }

  render() {
    const {
      groups, filterValue, perPage, isLoading, error, errorMessage,
    } = this.state
    return (
      <Segment>
        <Header as="h2" icon textAlign="center">
          <Icon name="group" circular />
          <Header.Content>Groups</Header.Content>
          <Header.Subheader>
            Manage the groups&apos; attributes and users
          </Header.Subheader>
        </Header>
        <Divider />
        {error && errorMessage && (
          <Message error content={`ERROR: ${errorMessage}`} />
        )}
        {isLoading && (
          <Placeholder fluid>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        )}
        {!isLoading && (
          <>
            <Segment
              basic
              clearing
              style={{ margin: '1em 0em', padding: 0 }}
            >
              <Input
                icon="search"
                placeholder="Filter..."
                onChange={(e, { value }) => this.setState({ filterValue: value })}
              />
              <span style={{ margin: '0em 0.5em' }} />
              <Dropdown
                compact
                selection
                value={perPage}
                options={[10, 25, 50, 100].map((value) => ({
                  key: value, text: value, value,
                }))}
                onChange={(e, { value }) => this.setState({ perPage: value })}
              />
              <AddNewGroup getGroupData={this.getGroupData} />
            </Segment>
            <GroupsTable
              groups={groups}
              filterValue={filterValue}
              perPage={perPage}
              getGroupData={this.getGroupData}
            />
          </>
        )}
      </Segment>
    )
  }
}

export default Groups
