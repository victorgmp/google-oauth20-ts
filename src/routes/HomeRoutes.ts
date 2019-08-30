import { Router, Request, Response, NextFunction } from 'express';

class HomeRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/', this.home);
  }

  public home(req: Request, res: Response) {
    // res.send('you are logged in, this is your profile -' + req.user.username)
    res.render('home', { user: req.user });
  }
}

const homeRoutes = new HomeRoutes();

export default homeRoutes.router;
