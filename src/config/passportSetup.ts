import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { config as configEnv } from 'dotenv';
// require our environment variables
configEnv();
import User, { IUser } from '../models/userModel';

const passportSetup = () => {
  passport.serializeUser((user: IUser, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    await User.findById(id).then((user: IUser) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        // options for the google strategy
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
        callbackURL: '/auth/google/redirect',
      },
      async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        // check if user already exist in our db
        // console.log(profile);
        const currentUser: IUser = await User.findOne({ googleId: profile.id });
        try {
          if (currentUser) {
            // already have the user
            console.log('user is: ', currentUser);
            await done(null, currentUser);
          } else {
            // if not, create user in our db
            const newUser: IUser = new User({
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.picture,
            });
            await newUser.save();
            console.log(`new user created: '${newUser}`);
            await done(null, newUser);
          }
        } catch (err) {
          console.log(err);
        }
      },
    ),
  );
};

export default passportSetup;
