// Import only the pure functions for testing
import {
  filterNonEditable, buildStateFromFields, changeFieldValue, formIsValid,
} from '../helpers'

describe('Examine the function that filters non-editable fields', () => {
  const objectStructure = {
    key1: { editable: false },
    key2: { editable: true },
    key3: { editable: true },
    key4: { editable: false },
    key5: { editable: false },
    key6: { editable: false },
    key7: { editable: true },
    key8: { editable: true },
    key9: { editable: false },
  }
  const arrayOfKeys = [
    'key1', 'key2', 'key3', 'key4', 'key5', 'key6', 'key7', 'key8', 'key9',
  ]
  const filteredArrayOfKeys = [
    'key2', 'key3', 'key7', 'key8',
  ]
  it("filters out the keys for which the parent object has 'editable' set to 'false'", () => {
    expect(arrayOfKeys.filter(filterNonEditable(objectStructure))).toEqual(filteredArrayOfKeys)
  })
})

describe('Examine the function that builds a well structured object', () => {
  const fields = [
    'key1', 'key2', 'key3', 'key4', 'key5',
  ]
  const attrs = {
    key1: { type: 'string' },
    key2: { type: 'integer' },
    key3: { type: 'array' },
    key4: { type: 'object' },
    key5: { type: 'string', default: 'value5' },
  }
  const structuredObject = {
    key1: '',
    key2: 0,
    key3: [],
    key4: {},
    key5: 'value5',
  }
  it('builds a default structure with the proper type for each key', () => {
    expect(buildStateFromFields(fields, attrs)).toEqual(structuredObject)
  })
})

describe('Examine the function that changes one value in an object', () => {
  const name = 'key2'
  const value = 42
  const initialObject = {
    key1: '',
    key2: 0,
    key3: [],
    key4: {},
    key5: 'value5',
  }
  const finalObject = {
    key1: '',
    key2: 42,
    key3: [],
    key4: {},
    key5: 'value5',
  }
  it('given an object and a new pair [key, value], returns the same object updated', () => {
    expect(changeFieldValue(initialObject, { name, value })).toEqual(finalObject)
  })
})

describe('Examine the function that validates an object of form values', () => {
  const failField = 'key2'
  const validData = {
    key1: 'Foo',
    [failField]: 'Bar',
  }
  const invalidData = {
    key1: 'Foo',
    [failField]: 1,
  }
  const attrs = {
    key1: { validator: (value) => !(typeof value === 'string') },
    [failField]: { validator: (value) => !(typeof value === 'string') },
  }
  it('given a valid form object, return an empty string (no errors)', () => {
    expect(formIsValid(validData, attrs)).toEqual('')
  })
  it('given an invalid form object, returns a non-empty string (with errors)', () => {
    expect(formIsValid(invalidData, attrs)).toEqual(`form validation failed at '${failField}'`)
  })
})
