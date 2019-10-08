// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Confirm, Message, Modal,
} from 'semantic-ui-react'
import { deleteUser } from '../api/actions'

const DeleteUser = ({ userID, getUserData }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setError(false)
    setErrorMsg('')
    setLoading(false)
  }, [confirmOpen])

  return (
    <>
      <Button
        color="red"
        icon="trash"
        size="mini"
        onClick={() => setConfirmOpen(!confirmOpen)}
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(!confirmOpen)}
        onConfirm={() => {
          // Send the data to the server
          setLoading(true)
          setError(false)
          setErrorMsg('')
          deleteUser({ userID }).then(({ status, message }) => {
            if (status === 'success') {
              setError(false)
              setErrorMsg('')
              getUserData()
            } else {
              setError(true)
              setErrorMsg(message)
            }
            setLoading(false)
          }).catch((errorCatch) => {
            setError(true)
            setErrorMsg(errorCatch)
            setLoading(false)
          })
        }}
        header="Confirm user deletion"
        content={(
          <Modal.Content>
            {!error && !isLoading && (
              <p>{`Are you sure you want to delete the user #${userID} ?`}</p>
            )}
            {isLoading && (
              <p>Please wait..</p>
            )}
            {error && (
              <Message
                negative
                content={`Error: ${errorMsg}`}
              />
            )}
          </Modal.Content>
        )}
      />
    </>
  )
}

/* Defines the type of data expected in each passed prop */
DeleteUser.propTypes = {
  userID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  getUserData: PropTypes.func.isRequired,
}

export default DeleteUser
