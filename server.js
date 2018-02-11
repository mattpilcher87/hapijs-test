'use strict';

const mockData = require('./mockData')

const Hapi = require('hapi');
const Boom = require('boom')

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
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
  path: '/{name}',
  handler: function (request, reply) {
    var data = {
      id: 1,
      name: 'matt',
      role: 'dev'
    }

    reply(data)
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
