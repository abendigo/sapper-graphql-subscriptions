import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';

import express from 'express';
import http from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema } from './_schema';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
  );

const server = http.createServer(app);

server.listen(PORT, err => {
  if (err) console.log('error', err);

  new SubscriptionServer({execute, subscribe, schema},
    {
      server: server,
      path: '/subscriptions'
    });
});
