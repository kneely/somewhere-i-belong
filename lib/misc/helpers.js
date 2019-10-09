// Helper functions
import config from '../config'

const debugPrint = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable-next-line no-console */
    console.log(...args)
  }
}

const sleep = (duration) => new Promise((resolve) => {
  setTimeout(() => { resolve(0) }, duration)
})

const fakeFetch = async (url = null, opts = {}) => {
  if (!url) {
    const { handlerFn } = opts
    await sleep(config.serverResponse)
    return Promise.resolve(handlerFn(url, opts))
  }
  return fetch(url, opts).then((response) => response.json())
}

const filterNonEditable = (attrs) => (field) => (
  attrs[field] && attrs[field].editable
)

const buildStateFromFields = (fields = [], attrs = {}) => {
  const fieldsState = {}
  fields.forEach((field) => {
    if (attrs[field].default) {
      fieldsState[field] = attrs[field].default
    } else if (attrs[field].type === 'string') {
      fieldsState[field] = ''
    } else if (attrs[field].type === 'integer') {
      fieldsState[field] = 0
    } else if (attrs[field].type === 'array') {
      fieldsState[field] = []
    } else if (attrs[field].type === 'object') {
      fieldsState[field] = {}
    }
  })
  return fieldsState
}

const changeFieldValue = (originalState, { name, value }) => {
  const newState = { ...originalState }
  newState[name] = value
  return newState
}

const formIsValid = (data = {}, attrs = {}) => {
  let errorMsg = ''
  Object.keys(data).forEach((field) => {
    if (typeof attrs[field].validator === 'function') {
      if (attrs[field].validator(data[field])) {
        errorMsg = `form validation failed at '${field}'`
      }
    }
  })
  return errorMsg
}

/*
Adapted from:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
*/
const storageAvailable = (type) => {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0)
  }
}

const writeToLS = (key, value) => {
  if (storageAvailable('localStorage')) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    debugPrint('localStorage is unavailable')
  }
}

const readFromLS = (key) => {
  if (storageAvailable('localStorage')) {
    return JSON.parse(localStorage.getItem(key))
  }
  debugPrint('localStorage is unavailable')
  return null
}

const deleteFromLS = (key) => {
  if (storageAvailable('localStorage')) {
    localStorage.removeItem(key)
  } else {
    debugPrint('localStorage is unavailable')
  }
}

const clearLS = () => {
  if (storageAvailable('localStorage')) {
    localStorage.clear()
  } else {
    debugPrint('localStorage is unavailable')
  }
}

const cleanupArray = (arr) => {
  if (Array.isArray(arr)) {
    return arr.filter((val) => !(val === null))
  }
  return []
}

export {
  fakeFetch, filterNonEditable, buildStateFromFields, changeFieldValue,
  formIsValid, writeToLS, readFromLS, deleteFromLS, clearLS, cleanupArray,
}
