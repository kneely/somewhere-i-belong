// Imports
import React from 'react'
import PropTypes from 'prop-types'
import SmartDataTable from 'react-smart-data-table'
import { Image, Message } from 'semantic-ui-react'
import ViewGroup from './view-group'
import EditGroup from './edit-group'
import DeleteGroup from './delete-group'
import config from '../config'

const GroupsTable = ({
  groups, filterValue, perPage, getGroupData,
}) => {
  const groupsTableHeaders = {
    avatar: {
      transform: (value) => <Image src={value} avatar />,
    },
    members: {
      transform: (value, index) => (Array.isArray(groups[index].members) ? `${groups[index].members.length}` : '-'),
    },
    tableActions: {
      text: 'Actions',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index) => (
        <>
          <ViewGroup groupID={groups[index].id} />
          <EditGroup group={groups[index]} getGroupData={getGroupData} />
          <DeleteGroup group={groups[index]} getGroupData={getGroupData} />
        </>
      ),
    },
  }

  return (
    <SmartDataTable
      data={groups}
      headers={groupsTableHeaders}
      name="groups-table"
      parseImg={{
        className: 'ui avatar image',
      }}
      withLinks
      className="ui selectable table"
      emptyTable={(
        <Message content="There are no groups available to display." />
      )}
      orderedHeaders={config.group.columns}
      hideUnordered
      sortable
      filterValue={filterValue}
      perPage={perPage}
    />
  )
}

/* Defines the type of data expected in each passed prop */
GroupsTable.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  getGroupData: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
  perPage: PropTypes.number,
}

GroupsTable.defaultProps = {
  filterValue: '',
  perPage: 0,
}

export default GroupsTable
