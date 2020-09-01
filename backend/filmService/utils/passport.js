const passport = require('passport');
const axios = require('axios');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtSecretKey, USER_SERVICE_ENDPOINT } = require('../utils/keys');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const { data } = await axios.get(`${USER_SERVICE_ENDPOINT}/users/${jwtPayload.id}`);
      return done(null, data);
    } catch (error) {
      return done(null, false);
    }
  })
);
