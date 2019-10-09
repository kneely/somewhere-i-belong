// Some global app settings are defined here
const config = {}

// Self-explanatory app title
config.appTitle = 'Somewhere I Belong'

// Where to use faker to simulate data
config.useFaker = false

// How many fake users to generate
config.numFakeUsers = 5

// How many fake groups to generate
config.numFakeGroups = 5

// Timeout to simulate server response times (ms)
config.serverResponse = 400

// User config
config.user = {}

// User table columns
config.user.columns = [
  'id', 'avatar', 'username', 'fullName', 'email', 'groups', 'tableActions',
]

// User attributes
config.user.attrs = {
  id: {
    type: 'integer',
    label: 'ID',
    editable: false,
    validator: false,
    visible: true,
  },
  avatar: {
    type: 'string',
    label: 'Avatar',
    editable: false,
    validator: false,
    default: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTIwOC41IDIxIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii0yMDguNSAyMSAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PGNpcmNsZSBjeD0iLTE1OC41IiBjeT0iNzEiIGZpbGw9IiNGNUVFRTUiIGlkPSJNYXNrIiByPSI1MCIvPjxnPjxkZWZzPjxjaXJjbGUgY3g9Ii0xNTguNSIgY3k9IjcxIiBpZD0iTWFza18yXyIgcj0iNTAiLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzRfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18yXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIiBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyICAgICBjMC0xLjcsMC02LjMsMC02LjNoLTE1aC0xNWMwLDAsMCw0LjYsMCw2LjNjMCw4LjctNC41LDExLjMtNywxMmMtNi44LDEuOS0yOC4xLDcuMy0yOC4xLDYuN3YxNGg1MC4xSC0xMDguNXoiIGZpbGw9IiNFNkMxOUMiIGlkPSJNYXNrXzNfIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIj48ZGVmcz48cGF0aCBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyYzAtMS43LDAtNi4zLDAtNi4zaC0xNWgtMTVjMCwwLDAsNC42LDAsNi4zICAgICAgIGMwLDguNy00LjUsMTEuMy03LDEyYy02LjgsMS45LTI4LjEsNy4zLTI4LjEsNi43djE0aDUwLjFILTEwOC41eiIgaWQ9Ik1hc2tfMV8iLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzVfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18xXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNV8pIiBkPSJNLTE1OC41LDEwMC4xYzEyLjcsMCwyMy0xOC42LDIzLTM0LjQgICAgICBjMC0xNi4yLTEwLjMtMjQuNy0yMy0yNC43cy0yMyw4LjUtMjMsMjQuN0MtMTgxLjUsODEuNS0xNzEuMiwxMDAuMS0xNTguNSwxMDAuMXoiIGZpbGw9IiNENEIwOEMiIGlkPSJoZWFkLXNoYWRvdyIvPjwvZz48L2c+PHBhdGggZD0iTS0xNTguNSw5NmMxMi43LDAsMjMtMTYuMywyMy0zMWMwLTE1LjEtMTAuMy0yMy0yMy0yM3MtMjMsNy45LTIzLDIzICAgIEMtMTgxLjUsNzkuNy0xNzEuMiw5Ni0xNTguNSw5NnoiIGZpbGw9IiNGMkNFQTUiIGlkPSJoZWFkIi8+PC9nPjwvc3ZnPg==',
    visible: false,
  },
  username: {
    type: 'string',
    label: 'Username',
    editable: true,
    validator: (value) => !(value && typeof value === 'string' && !value.includes(' ')),
    visible: true,
  },
  fullName: {
    type: 'string',
    label: 'Full Name',
    editable: true,
    validator: (value) => !value,
    visible: true,
  },
  email: {
    type: 'string',
    label: 'E-mail',
    editable: true,
    validator: (value) => (
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)
    ),
    visible: true,
  },
  groups: {
    type: 'array',
    label: 'Groups',
    editable: false,
    validator: (value) => !(Array.isArray(value) && value.length > 0),
    visible: false,
  },
}

// Group config
config.group = {}

// Group table columns
config.group.columns = [
  'id', 'name', 'description', 'members', 'tableActions',
]

// Group attributes
config.group.attrs = {
  id: {
    type: 'integer',
    label: 'ID',
    editable: false,
    validator: false,
    visible: true,
  },
  avatar: {
    type: 'string',
    label: 'Avatar',
    editable: false,
    validator: false,
    default: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGQ9Ik0gMTIgNCBDIDguODcgNCA2LjM0Mzc1IDYuNTI2MjUgNi4zNDM3NSA5LjY1NjI1IEMgNi4zNDM3NSAxMi43ODUyNSA4Ljg3IDE1LjM0Mzc1IDEyIDE1LjM0Mzc1IEMgMTUuMTMgMTUuMzQzNzUgMTcuNjU2MjUgMTIuNzg2MjUgMTcuNjU2MjUgOS42NTYyNSBDIDE3LjY1NjI1IDYuNTI2MjUgMTUuMTMgNCAxMiA0IHogTSA0IDcgQyAyLjM0MyA3IDEgOC4zNDMgMSAxMCBDIDEgMTEuNjU3IDIuMzQzIDEzIDQgMTMgQyA0LjcyIDEzIDUuMzU4IDEyLjczNDUgNS44NzUgMTIuMzEyNSBDIDUuNzY4IDEyLjA2NDUgNS43MDIgMTEuODI0NSA1LjYyNSAxMS41NjI1IEMgNS4yMTggMTEuOTkwNSA0LjYzOCAxMi4yNSA0IDEyLjI1IEMgMy4xMTkgMTIuMjUgMi4zNjkgMTEuNzM4IDIgMTEgTCA1LjQ2ODc1IDExIEMgNS4zODA3NSAxMC41NjggNS4zNDM3NSAxMC4xMTQyNSA1LjM0Mzc1IDkuNjU2MjUgQyA1LjM0Mzc1IDguOTA2MjUgNS40NTc1IDguMjA0MjUgNS42ODc1IDcuNTMxMjUgQyA1LjIwNTUgNy4yMDEyNSA0LjYyOCA3IDQgNyB6IE0gMjAgNyBDIDE5LjM3MiA3IDE4Ljc5NDUgNy4yMDEyNSAxOC4zMTI1IDcuNTMxMjUgQyAxOC41NDI1IDguMjA0MjUgMTguNjU2MjUgOC45MDYyNSAxOC42NTYyNSA5LjY1NjI1IEMgMTguNjU2MjUgMTAuMTE0MjUgMTguNjE5MjUgMTAuNTY4IDE4LjUzMTI1IDExIEwgMjIgMTEgQyAyMS42MzEgMTEuNzM4IDIwLjg4MiAxMi4yNSAyMCAxMi4yNSBDIDE5LjM2MiAxMi4yNSAxOC43ODIgMTEuOTkwNSAxOC4zNzUgMTEuNTYyNSBDIDE4LjI5OCAxMS44MjQ1IDE4LjIzMiAxMi4wNjQ1IDE4LjEyNSAxMi4zMTI1IEMgMTguNjQyIDEyLjczNDUgMTkuMjggMTMgMjAgMTMgQyAyMS42NTcgMTMgMjMgMTEuNjU3IDIzIDEwIEMgMjMgOC4zNDMgMjEuNjU3IDcgMjAgNyB6IE0gOC4yMTg3NSAxMS41NjI1IEwgMTUuNzgxMjUgMTEuNTYyNSBDIDE1LjA4MzI1IDEyLjk1NjUgMTMuNjY1IDEzLjkwNjI1IDEyIDEzLjkwNjI1IEMgMTAuMzM1IDEzLjkwNjI1IDguOTE1NzUgMTIuOTU3NSA4LjIxODc1IDExLjU2MjUgeiBNIDIuMzEyNSAxMy41OTM3NSBDIDEuMjMwNSAxMy44Nzc3NSAwLjM4OSAxNC41NTEgMCAxNiBMIDYuNzgxMjUgMTYgQyA3LjExNTI1IDE1LjgyNSA3LjQ2NTc1IDE1LjY2MTI1IDcuODQzNzUgMTUuNTMxMjUgQyA3LjQwOTc1IDE0LjM5NDI1IDYuNjQ4NSAxMy44NDY3NSA1LjY4NzUgMTMuNTkzNzUgQyA1LjE4NjUgMTMuODYyNzUgNC42MDcgMTQgNCAxNCBDIDMuMzkyIDE0IDIuODEzNSAxMy44NjE3NSAyLjMxMjUgMTMuNTkzNzUgeiBNIDE4LjMxMjUgMTMuNTkzNzUgQyAxNy4zNTE1IDEzLjg0Njc1IDE2LjU5MDI1IDE0LjM5NDI1IDE2LjE1NjI1IDE1LjUzMTI1IEMgMTYuNTM0MjUgMTUuNjYxMjUgMTYuODg0NzUgMTUuODI1IDE3LjIxODc1IDE2IEwgMjQgMTYgQyAyMy42MTEgMTQuNTUxIDIyLjc2OTUgMTMuODc3NzUgMjEuNjg3NSAxMy41OTM3NSBDIDIxLjE4NjUgMTMuODYxNzUgMjAuNjA4IDE0IDIwIDE0IEMgMTkuMzkzIDE0IDE4LjgxMzUgMTMuODYyNzUgMTguMzEyNSAxMy41OTM3NSB6IE0gOC43MTg3NSAxNi4zMTI1IEMgNi42MTA3NSAxNi44NjY1IDQuOTc1NzUgMTguMTc4IDQuMjE4NzUgMjEgTCAxOS43ODEyNSAyMSBDIDE5LjAyNDI1IDE4LjE3NyAxNy4zOTEyNSAxNi44NjU1IDE1LjI4MTI1IDE2LjMxMjUgQyAxNC4zMDUyNSAxNi44MzU1IDEzLjE4NCAxNy4xMjUgMTIgMTcuMTI1IEMgMTAuODE4IDE3LjEyNSA5LjY5NDc1IDE2LjgzNjUgOC43MTg3NSAxNi4zMTI1IHoiLz4KPC9zdmc+Cg==',
    visible: false,
  },
  name: {
    type: 'string',
    label: 'Group Name',
    editable: true,
    validator: (value) => !value,
    visible: true,
  },
  description: {
    type: 'string',
    label: 'Group Description',
    editable: true,
    validator: false,
    visible: true,
  },
  members: {
    type: 'arrays',
    label: 'Members',
    editable: false,
    validator: false,
    visible: false,
  },
}

export default config
