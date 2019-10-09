// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const ViewGroup = ({ groupID }) => (
  <Button
    color="blue"
    icon="eye"
    size="mini"
    as={Link}
    to={`/groups/${groupID}`}
  />
)

/* Defines the type of data expected in each passed prop */
ViewGroup.propTypes = {
  groupID: PropTypes.string.isRequired,
}

export default ViewGroup
