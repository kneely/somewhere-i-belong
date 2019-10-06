// Helper functions
const sleep = (duration) => new Promise((resolve) => {
  setTimeout(() => { resolve(0) }, duration)
})

const fakeFetch = async (url = null, opts = {}) => {
  if (!url) {
    const { handlerFn } = opts
    await sleep(0)
    return Promise.resolve(handlerFn(url, opts))
  }
  return fetch(url, opts).then((response) => response.json())
}

export { fakeFetch }
