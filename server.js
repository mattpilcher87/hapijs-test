'use strict';

const mockData = require('./mockData')

const Hapi = require('hapi')
const Boom = require('boom')
const Joi = require('joi')

const server = new Hapi.Server()
server.connection({ port: 3000, host: 'localhost' })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    // Filter data based on query
    const result = mockData.filter(
      object => object.name === request.query.name
    )

    if(result.length < 1) {
      reply(Boom.notFound('Person does not exist'))
    }
    else {
      reply(result)
    }
  }
});

server.route({
  method: 'GET',
  path: '/valid/{test}',
  handler: function (request, reply) {
    // Check {test} param is between 3 and 10 characters or 400
    reply('Valid Test')
  },
  config: {
    validate: {
      params: {
        test: Joi.string().min(3).max(10)
      }
    }
  }
})

server.route({
  method: 'GET',
  path: '/name/{name}',
  handler: function (request, reply) {
    // Filter data based on route
    const result = mockData.filter(
      object => object.name === request.params.name
    )

    if(result.length < 1) {
      reply(Boom.notFound('Person does not exist'))
    }
    else {
      reply('Hello, ' + encodeURIComponent(request.params.name))
    }
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
