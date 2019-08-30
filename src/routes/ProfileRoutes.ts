import { Router, Request, Response, NextFunction } from 'express';

class ProfileRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/', this.authCheck, this.profile);
  }

  public authCheck(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      // if user is not logged in
      res.redirect('/auth/login');
    } else {
      // if logged in
      next();
    }
  }

  public profile(req: Request, res: Response) {
    // res.send('you are logged in, this is your profile -' + req.user.username)
    res.render('profile', { user: req.user });
  }
}

const profileRoute = new ProfileRoute();

export default profileRoute.router;
