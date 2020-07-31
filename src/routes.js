'use strict';

import { connectMongoDB } from './Utils/db/connect';
import passport from './Middlewares/passport';

const app = require('router')();
const ensureLogged = passport.authenticate('bearer', { session: false });
connectMongoDB();

app.use(require('body-parser').json({ limit: '50mb' }));
app.use(require('./Middlewares/query'));
app.use(require('./Middlewares/json'));
app.use(require('./Middlewares/cors'));
app.use(passport.initialize({}));

app.get('/', require('./Controllers/status'));

app.use(require('./Middlewares/next'));

export default app;