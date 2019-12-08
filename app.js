'use strict';

// Establish global configs
const Config = require('./lib/config/init-config.js');
global.GLOBAL_CONFIG = new Config();

// Set up aws region
const AWS = require('aws-sdk');
AWS.config.region = GLOBAL_CONFIG.aws.region;

const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const koaEjs = require('koa-ejs');

// Set up the app
const app = new Koa();
koaEjs(app, {
  root: path.join(__dirname, 'src', 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false
});
app.use(koaBody());
app.keys = GLOBAL_CONFIG.server.keys;

// Routes
app.use(require('./lib/routes/index.js').routes());
app.use(require('./lib/routes/login.js').routes());

app.listen(GLOBAL_CONFIG.server.port).on('listening', () => {
  console.log('Listening on port ' + GLOBAL_CONFIG.server.port);
});
