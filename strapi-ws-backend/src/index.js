'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {


    /*
    
    verify(token)

    */

    const fetchEntries = async () => {
      return await strapi.entityService.findMany('api::message.message', {
        fields: ['text', 'type', 'timestamp'],
        sort: { timestamp: 'ASC' },
      });
    }

    var io = require('socket.io')(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]

      }
    });

    io.use(async (socket, next) => {

      try {

        //Socket Authentication
        const result = await strapi.plugins[
          'users-permissions'
        ].services.jwt.verify(socket.handshake.query.token);

        //Save the User ID to the socket connection
        socket.user = result.id;
        next();
      } catch (error) {


        console.log(error)
      }



    }).on('connection', function (socket) {


      console.log('a user connected');

      socket.on('loadMessages', async (data) => {

        try {
          const entries = await fetchEntries()
          io.emit("loadMessages", entries);
          console.log(entries);

        } catch (error) {
          console.log(error);
        }

      });

      socket.on('sendMessage', async (data) => {

        let params = data;

        try {
          // console.log(strapi);
          console.log(params);
          await strapi.entityService.create('api::message.message',
            {
              data: {
                text: params.messageText,
                type: 0,
                timestamp: new Date()
              }
            });
          await strapi.entityService.create('api::message.message',
            {
              data: {
                text: params.messageText,
                type: 1,
                timestamp: new Date()
              }
            });
          const entries = await fetchEntries()
          io.emit("loadMessages", entries);

        } catch (error) {
          console.log(error);
        }

      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    strapi.io = io

  },
};
