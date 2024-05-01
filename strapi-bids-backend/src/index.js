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
    let interval;

    let messageList = []

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




      if (interval) {
        clearInterval(interval);
      }

      console.log('a user connected');

      socket.on('loadMessages', async (data) => {

        let params = data;

        try {
          io.emit("loadMessages", messageList);
          console.log(messageList);

        } catch (error) {
          console.log(error);
        }

      });

      socket.on('sendMessage', async (data) => {

        let params = data;

        try {
          console.log(params);
          messageList.push({
            text: params.messageText,
            type: 0
          })
          messageList.push({
            text: params.messageText,
            type: 1
          })
          io.emit("loadMessages", messageList);

        } catch (error) {
          console.log(error);
        }

      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
        clearInterval(interval);
      });
    });

    strapi.io = io

  },
};
