# Monorepo with Strapi Backend and Vue.js Frontend

This repository contains a monorepo setup with a backend built using Strapi with Socket.io and a frontend built using Vue.js. I have implemented a chat like interface which echos the client message from the server side. Messages are being saved in SQLite. I have also implemented a barebones auth service using JWT.

## Notes

- Use of node 16 is recommended.
- Screenshots and demo video is included in the demo-media folder

## Backend (Strapi with Socket.io)

### Setup Instructions

1. **Install Dependencies**: Navigate to the `backend` directory and install the dependencies using yarn.

```
yarn install
```

2. **Run Strapi Server**: Start the Strapi server using the following command:

```
yarn develop
```

This command will start the Strapi server in development mode, and it will be accessible at `http://localhost:1337`.

## Frontend (Vue.js)

### Setup Instructions

1. **Install Dependencies**: Navigate to the `frontend` directory and install the dependencies using yarn.

```
yarn install
```
2. **Run Vue.js Development Server**: Start the Vue.js development server using the following command:

```
yarn serve
```
This command will compile the Vue.js application and start a development server. The application will be accessible at `http://localhost:8080`.

