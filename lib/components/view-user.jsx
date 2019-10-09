// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const ViewUser = ({ userID }) => (
  <Button
    color="blue"
    icon="eye"
    size="mini"
    as={Link}
    to={`/users/${userID}`}
  />
)

/* Defines the type of data expected in each passed prop */
ViewUser.propTypes = {
  userID: PropTypes.string.isRequired,
}

export default ViewUser
