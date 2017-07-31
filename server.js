const Hapi = require('hapi')
const HapiRouter = require('hapi-router')
const Vision = require('vision')
const Inert = require('inert')

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: `${__dirname}/assets/`
            }
        }
    }
})
server.connection({
  host: 'localhost',
  port: 8000
})

// register static file handler
server.register(Inert, (err) => {
    if (err) {
        throw err
    }
})

// register template engine
server.register(Vision, (err) => {
    if (err) {
        throw err
    }

    server.views({
        defaultExtension: 'pug',
        engines: {
            pug: require('pug'),
        },
        relativeTo: __dirname,
        path: 'assets/views/'
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
