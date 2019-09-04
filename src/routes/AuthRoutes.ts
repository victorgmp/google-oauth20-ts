import { Router, Request, Response } from 'express';
import passport from 'passport';

import User, { IUser } from '../models/userModel';

class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/register', (req: Request, res: Response) => {
      res.render('register', { user: req.user });
    });

    this.router.post('/register', (req: Request, res: Response) => {
      const { username, password } = req.body;
      (async function addUser() {
        try {
          const user: IUser = await User.findOne({ username });
          if (!user) {
            const newUser: IUser = new User({ username, password });
            await newUser.save();
            res.status(201).render('login', { user });
          } else {
            res.status(400).redirect('/');
          }
        } catch (error) {
          console.log(error);
        }
      })();
    });

    this.router.post(
      '/local',
      passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/',
      }),
      (req: Request, res: Response) => {
        // res.send(req.user);
        res.redirect('/profile/');
      },
    );

    this.router.get('/login', (req: Request, res: Response) => {
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

    this.router.get('/google/redirect', passport.authenticate('google'), (req: Request, res: Response) => {
      // res.send(req.user);
      res.redirect('/profile/');
    });
  }
}
const authRoutes = new AuthRoutes();

export default authRoutes.router;
