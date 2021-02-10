'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: process.env.PORT,
  host: '0.0.0.0'
});

module.exports.init = async () => {
  await server.initialize();
  return server;
};

/**
 *
 * @param {Discord.EventHandler} eventHandler
 */
module.exports.start = async (eventHandler) => {

  server.route({
    method: 'POST',
    path: '/send',
    handler: async (request) => {
      const data = request.payload;
      if (data.clientId && data.message && data.target) {
        try {
          if (data.target === 'user')
            return await eventHandler.onApiMessageToUser(data.clientId, data.message);
          else if (data.target === 'channel')
            return await eventHandler.onApiMessageToChannel(data.clientId, data.message);
        }
        catch {
          return 'Unknown status';
        }
      }
    },
    options: {
      payload: {
        maxBytes: 10485760,
        parse: true,
        output: 'stream',
        allow: ['multipart/form-data'],
        multipart: true
      }
    }
  });
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
