// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Label } from 'semantic-ui-react'
import { getGroups } from '../api/actions'

const UserGroups = ({ userGroups }) => {
  const [groups, setGroups] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!groups) {
      setLoading(true)
      getGroups().then(({ status, message, data }) => {
        if (status === 'success') {
          setLoading(false)
          setError('')
          setGroups(data.filter(({ id }) => userGroups.includes(id)))
        } else {
          setLoading(false)
          setError(message)
          setGroups(null)
        }
      }).catch((errorMessage) => {
        setLoading(false)
        setError(errorMessage)
        setGroups(null)
      })
    }
  }, [])

  return (
    <Label.Group color="blue" size="mini">
      {!loading && !error && groups && groups.map(({ id, name }) => (
        <Label as={Link} to={`/groups/${id}`} key={id}>
          {name}
        </Label>
      ))}
    </Label.Group>
  )
}

/* Defines the type of data expected in each passed prop */
UserGroups.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  userGroups: PropTypes.array,
}

UserGroups.defaultProps = {
  userGroups: [],
}

export default UserGroups
