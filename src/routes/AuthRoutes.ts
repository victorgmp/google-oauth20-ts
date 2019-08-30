import { Router, Request, Response } from 'express';
import passport from 'passport';

class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/login', (req, res) => {
      res.render('login', { user: req.user });
    });

    this.router.get('/logout', (req, res) => {
      // res.send('logging out');
      req.logout();
      res.redirect('/');
    });

    this.router.get(
      '/google',
      passport.authenticate('google', {
        scope: ['profile'],
      }),
    );

    this.router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
      // res.send(req.user);
      res.redirect('/profile/');
    });
  }
}
const authRoutes = new AuthRoutes();

export default authRoutes.router;
