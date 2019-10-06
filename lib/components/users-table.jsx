// Imports
import React from 'react'
import PropTypes from 'prop-types'
import SmartDataTable from 'react-smart-data-table'
import { Message } from 'semantic-ui-react'

const usersTableHeaders = {
  tableActions: {
    text: 'Actions',
    invisible: false,
    sortable: false,
    filterable: false,
    transform: () => '-',
  },
}

const UsersTable = ({ users, filterValue, perPage }) => (
  <SmartDataTable
    data={users}
    headers={usersTableHeaders}
    name="users-table"
    parseImg={{
      className: 'ui avatar image',
    }}
    className="ui selectable table"
    emptyTable={(
      <Message content="There are no users available to display" />
    )}
    orderedHeaders={[
      'id', 'avatar', 'username', 'tableActions',
    ]}
    hideUnordered
    sortable
    filterValue={filterValue}
    perPage={perPage}
  />
)

/* Defines the type of data expected in each passed prop */
UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterValue: PropTypes.string,
  perPage: PropTypes.number,
}

UsersTable.defaultProps = {
  filterValue: '',
  perPage: 0,
}

export default UsersTable
