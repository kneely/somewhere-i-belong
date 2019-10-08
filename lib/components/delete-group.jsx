// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Confirm, Message, Modal,
} from 'semantic-ui-react'
import { deleteGroup } from '../api/actions'

const DeleteGroup = ({ groupID, getGroupData }) => {
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
          deleteGroup({ groupID }).then(({ status, message }) => {
            if (status === 'success') {
              setError(false)
              setErrorMsg('')
              getGroupData()
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
        header="Confirm group deletion"
        content={(
          <Modal.Content>
            {!error && !isLoading && (
              <p>{`Are you sure you want to delete the group #${groupID} ?`}</p>
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
DeleteGroup.propTypes = {
  groupID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  getGroupData: PropTypes.func.isRequired,
}

export default DeleteGroup
