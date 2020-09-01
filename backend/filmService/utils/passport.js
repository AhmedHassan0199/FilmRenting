const passport = require('passport');
const mongoose = require('mongoose');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtSecretKey } = require('../utils/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('PAYLOAD:', jwt_payload);
    mongoose.model('usersData').findOne({ _id: jwt_payload.id }, function (err, user) {
      console.log('ERROR : ' + err);
      console.log('USER_FOUND : ' + user);
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

//Authentication from verifing the token and returning a user if token valid
const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = { isAuthenticated };
