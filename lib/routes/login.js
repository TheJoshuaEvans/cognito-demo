'use strict';

const Router = require('koa-router');

const jwtDecode = require('jwt-decode');

const getToken = require('../utils/get-tokens.js');
const getCredentials = require('../utils/get-credentials.js');

const router = new Router({
  prefix: '/login'
});

router.get('/', async (ctx) => {
  let tokens, credentials, userInfo;
  let status = 'Succeeded!';
  try {
    tokens = await getToken(ctx.request.query['code']);
    credentials = await getCredentials(tokens.id_token);
    userInfo = jwtDecode(tokens.id_token);
  } catch (e) {
    console.error(e);
    status = 'Failed :(';
  }
  console.log(tokens);
  console.log(credentials);
  console.log(userInfo);

  await ctx.render('login', {status});
});

module.exports = router;
