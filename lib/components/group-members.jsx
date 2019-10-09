// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Label } from 'semantic-ui-react'
import { getUsers } from '../api/actions'

const GroupMembers = ({ groupMembers }) => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!users) {
      setLoading(true)
      getUsers().then(({ status, message, data }) => {
        if (status === 'success') {
          setLoading(false)
          setError('')
          setUsers(data.filter(({ id }) => groupMembers.includes(id)))
        } else {
          setLoading(false)
          setError(message)
          setUsers(null)
        }
      }).catch((errorMessage) => {
        setLoading(false)
        setError(errorMessage)
        setUsers(null)
      })
    }
  }, [])

  return (
    <Label.Group color="blue" size="mini">
      {!loading && !error && users && users.map(({ id, fullName }) => (
        <Label as={Link} to={`/users/${id}`} key={id}>
          {fullName}
        </Label>
      ))}
    </Label.Group>
  )
}

/* Defines the type of data expected in each passed prop */
GroupMembers.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  groupMembers: PropTypes.array,
}

GroupMembers.defaultProps = {
  groupMembers: [],
}

export default GroupMembers
