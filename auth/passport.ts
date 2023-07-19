// import passport from "passport";
// import passportJwt from "passport-jwt";
// const { models: {user}} = require('../models/index.ts')
// // import { User } from "../models/index"
// // const user = require("../models/user.cjs");
// import db from "../models";
// const ExtractJwt = passportJwt.ExtractJwt;
// const StrategyJwt = passportJwt.Strategy;
// import dotenv from "dotenv";
// dotenv.config();

// export const myPassport = passport.use(
//   new StrategyJwt(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     function (jwtPayload: any, done: any) {
//       return db.User
//         .findOne({ where: { user_id: jwtPayload.user_id } })
//         .then((user: any) => {
//           return done(null, db.User);
//         })
//         .catch((err: any) => {
//           return done(err);
//         });
//     }
//   )
// );

import passport from "passport";
import passportJwt from "passport-jwt";
import db  from "../models/index";
import { Request } from "express";

const { ExtractJwt, Strategy: StrategyJwt } = passportJwt;
const dotenv = require("dotenv");
dotenv.config();

const myPassport = passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload: any, done: any) => {
      try {
        const foundUser = await db.User.findOne({
          where: { id: jwtPayload.id },
        });
        return done(null, foundUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default myPassport;