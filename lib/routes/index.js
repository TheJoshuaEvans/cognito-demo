'use strict';

// Classes
const Router = require('koa-router');

const generateLoginLink = require('../utils/generate-login-link.js');

const router = new Router();

router.get('/', async (ctx) => {
  const params = {
    loginLink: generateLoginLink()
  };
  await ctx.render('index', params);
});

module.exports = router;
