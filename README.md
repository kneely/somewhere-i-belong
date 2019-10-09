# Somewhere I Belong
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Somewhere I Belong (SIB) is a simple user / group management system dashboard

## Requirements

This app uses an internal router which requires the server to be configured to
serve 404's with the root file `index.html`.

## Configuration

Several top level configurations can be tweaked in a dedicated file.

```
./lib/config.js
```

The navigation settings are also isolated from the rest of the application.

```
./lib/navigation.js
```

The API endpoints to the backend server are setup in a custom file as well.

```
./lib/api/api.js
```

In the absence of a backend server, the application relies on the browser's
`localStorage` engine. A faker to generate data on the fly is also included,
but disabled by default.

## Contribute

Always start by installing the project's dependencies.

```
$ npm install
```

Start the development server with a simple command. The server will serve over
`http://localhost:3000/`.

```
$ npm start
```

Run the tests.

```
$ npm test
```

Build for production.

```
$ npm run build
```

Clean the builds from the directory.

```
$ npm run clean
```
