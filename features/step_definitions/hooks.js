const { After, AfterAll, BeforeAll, Before } = require('cucumber');
const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

var serve = serveStatic('./build');

if (process.env.NODE_ENV !== 'travis') {
  require('dotenv').config({ path: '.env.local.test' });
}

const app = require('@dev-saas/api/src/app');
const { connection } = require('@dev-saas/api/src/database');
const mqtt = require('@dev-saas/api/src/mqtt');
const User = require('@dev-saas/api/src/models/user');
const pubsub = require('@dev-saas/api/src/pubsub');
let server;
let frontend;

BeforeAll(async function() {
  server = await app.listen(50000);

  frontend = await http
    .createServer(function(req, res) {
      var done = finalhandler(req, res);
      serve(req, res, done);
    })
    .listen();

  process.env.TEST_URL = `http://localhost:${frontend.address().port}`;

  return server;
});

Before(function() {
  return User.create({ email: 'test@test.com', password: 'test' });
});

After(async function() {
  await connection.db.dropDatabase();
  return this.driver.quit();
});

AfterAll(async function() {
  await pubsub.close();
  await connection.close();
  await frontend.close();
  await mqtt.end();
  return server.close();
});
