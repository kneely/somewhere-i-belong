// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Grid, Image, Message, Modal,
} from 'semantic-ui-react'
import { createGroup } from '../api/actions'
import {
  filterNonEditable, buildStateFromFields, changeFieldValue, formIsValid,
} from '../misc/helpers'
import config from '../config'

const AddNewGroup = ({ getGroupData }) => {
  const fields = Object.keys(config.group.attrs).filter(filterNonEditable(config.group.attrs))
  const fieldsStateDefault = buildStateFromFields(fields, config.group.attrs)

  const [modalOpen, setModalOpen] = useState(false)
  const [fieldsState, setFieldsState] = useState(fieldsStateDefault)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setFieldsState(fieldsStateDefault)
    setSuccess(false)
    setError(false)
    setErrorMsg('')
    setLoading(false)
  }, [modalOpen])

  return (
    <Modal
      trigger={(
        <Button
          color="green"
          content="Add new"
          floated="right"
          onClick={() => setModalOpen(!modalOpen)}
        />
      )}
      open={modalOpen}
      onClose={() => setModalOpen(!modalOpen)}
    >
      <Modal.Header>Add New Group</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {success && (
            <Message
              positive
              content="Group added successfully"
            />
          )}
          {error && (
            <Message
              negative
              content={`Error: ${errorMsg || 'Unknown'}`}
            />
          )}
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column width={2} textAlign="center" verticalAlign="top">
                <Image
                  centered
                  src={fieldsState.avatar || config.group.attrs.avatar.default}
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
                      label={config.group.attrs[field].label}
                      placeholder={config.group.attrs[field].label}
                      key={field}
                      value={fieldsState[field]}
                      onChange={
                        (e, { name, value }) => setFieldsState(
                          changeFieldValue(fieldsState, { name, value }),
                        )
                      }
                      error={(
                        fieldsState[field]
                        && typeof config.group.attrs[field].validator === 'function'
                          ? config.group.attrs[field].validator(fieldsState[field])
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
            const errorValidation = formIsValid(fieldsState, config.group.attrs)
            if (!errorValidation) {
              // Send the data to the server
              setLoading(true)
              setSuccess(false)
              setError(false)
              setErrorMsg('')
              createGroup(fieldsState).then(({ status, message }) => {
                if (status === 'success') {
                  setSuccess(true)
                  setError(false)
                  setErrorMsg('')
                  getGroupData()
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

AddNewGroup.propTypes = {
  getGroupData: PropTypes.func.isRequired,
}

export default AddNewGroup
