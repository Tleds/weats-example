require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.teste' : '.env',
});

const express = require('express');
const bodyParser = require('body-parser');

// const app = express();
const http = require('http');
// const { setupWebSocket } = require('./websocket');

// const server = http.Server(app);
const compression = require('compression');
const cors = require('cors');
const routes = require('./router');

class App {
  constructor() {
    this.server = express();
    this.http = http;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(compression());
    this.server.use(cors());
    // Load real time server
    // setupWebSocket(this.http);
  }

  routes() {
    // Endpoints
    this.server.use(routes);
  }
}

module.exports = new App().server;
