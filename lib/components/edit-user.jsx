// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Grid, Image, Message, Modal,
} from 'semantic-ui-react'
import { editUser } from '../api/actions'
import { filterNonEditable, changeFieldValue, formIsValid } from '../misc/helpers'
import config from '../config'

const EditUser = ({ user, getUserData }) => {
  const fields = Object.keys(config.user.attrs).filter(filterNonEditable(config.user.attrs))

  const [modalOpen, setModalOpen] = useState(false)
  const [fieldsState, setFieldsState] = useState(user)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setFieldsState(user)
    setSuccess(false)
    setError(false)
    setErrorMsg('')
    setLoading(false)
  }, [modalOpen])

  return (
    <Modal
      trigger={(
        <Button
          color="yellow"
          icon="pencil"
          size="mini"
          onClick={() => setModalOpen(!modalOpen)}
        />
      )}
      open={modalOpen}
      onClose={() => setModalOpen(!modalOpen)}
    >
      <Modal.Header>Edit User</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {success && (
            <Message
              positive
              content="User edited successfully"
            />
          )}
          {error && (
            <Message
              negative
              content={`Error: ${errorMsg || 'Unknown'}`}
            />
          )}
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2} textAlign="center" verticalAlign="top">
                <Image
                  centered
                  src={fieldsState.avatar || config.user.attrs.avatar.default}
                  size="tiny"
                  verticalAlign="top"
                  circular
                />
              </Grid.Column>
              <Grid.Column width={14}>
                <Form>
                  {fields.map((field) => (
                    <Form.Input
                      fluid
                      name={field}
                      label={config.user.attrs[field].label}
                      placeholder={config.user.attrs[field].label}
                      key={field}
                      value={fieldsState[field]}
                      onChange={
                        (e, { name, value }) => setFieldsState(
                          changeFieldValue(fieldsState, { name, value }),
                        )
                      }
                      error={(
                        fieldsState[field]
                        && typeof config.user.attrs[field].validator === 'function'
                          ? config.user.attrs[field].validator(fieldsState[field])
                          : false
                        )}
                    />
                  ))}
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          content="Close"
          onClick={() => setModalOpen(!modalOpen)}
        />
        <Button
          positive
          content="Save"
          loading={isLoading}
          disabled={isLoading || success}
          onClick={() => {
            // Validate the form
            const errorValidation = formIsValid(fieldsState, config.user.attrs)
            if (!errorValidation) {
              // Send the data to the server
              setLoading(true)
              setSuccess(false)
              setError(false)
              setErrorMsg('')
              editUser(fieldsState).then(({ status, message }) => {
                if (status === 'success') {
                  setSuccess(true)
                  setError(false)
                  setErrorMsg('')
                  getUserData()
                } else {
                  setSuccess(false)
                  setError(true)
                  setErrorMsg(message)
                }
                setLoading(false)
              }).catch((errorCatch) => {
                setSuccess(false)
                setError(true)
                setErrorMsg(errorCatch)
                setLoading(false)
              })
            } else {
              setSuccess(false)
              setError(true)
              setErrorMsg(errorValidation)
            }
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

/* Defines the type of data expected in each passed prop */
EditUser.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  user: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
}

export default EditUser