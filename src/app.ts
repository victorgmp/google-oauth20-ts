import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import morgan from 'morgan';

import passportSetup from './config/passportSetup';
import HomeRoutes from './routes/HomeRoutes';
import AuthRoutes from './routes/AuthRoutes';
import ProfileRoutes from './routes/ProfileRoutes';

import { config as configEnv } from 'dotenv';
// require our environment variables
configEnv();
// require our passport setup
passportSetup();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.views();
    this.routes();
  }
  // settings
  private settings() {
    this.app.set('port', process.env.PORT || 7002);
  }
  // middlewares
  private middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // set up cookies
    this.app.use(
      cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.cookiekey],
      }),
    );
    // initialize passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  // set up view engine
  private views() {
    this.app.set('views', './src/views');
    this.app.set('view engine', 'ejs');
  }
  // set up routes
  private routes() {
    this.app.use('/', HomeRoutes);
    this.app.use('/auth', AuthRoutes);
    this.app.use('/profile', ProfileRoutes);
  }
  // star app
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}

export default App;
