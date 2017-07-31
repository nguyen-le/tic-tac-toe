module.exports = [
    {
        method: 'GET',
        path: '/assets/js/{filename}',
        handler: function (request, reply) {
            reply.file(`dist/${request.params.filename}`, {confine: true})
        }
    }
]
