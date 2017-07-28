const Hapi = require('hapi')
const HapiReact = require('hapi-react')()
const HapiRouter = require('hapi-router')
const Vision = require('vision')

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

// register template engine
server.register(Vision, (err) => {
    if (err) {
        throw err
    }

    server.views({
        defaultExtension: 'jsx',
        engines: {
            jsx: HapiReact,
            js: HapiReact
        },
        relativeTo: __dirname,
        path: 'views'
    })
})

// register routes
server.register({
    register: HapiRouter,
    options: {
        routes: 'routes/*.js'
    }
}, function (err) {
    if (err) {
        throw err
    }
})

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})
