// const user = require("../models/user.cjs");
import { Request, Response } from 'express';
import jwt , {Secret, JwtPayload}from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from '../models';
// const { models: {user}} = require('../models/index.ts')
// import { User } from "../models/index";
const secretKey: Secret = process.env.JWT_SECRET || "";

export const register = async (req: Request ,res: Response) => {
  const { nama, roles, email, password } = req.body;

  const alreadyExistUser = await db.User.findOne({ where: { nama, email } }).catch((err: any) => {
    console.log("error: ", err);
  });

  if (alreadyExistUser) {
    return res.json({ 
      success: true,
      message: "User with email already exist",
      data:{},
    });
  }

  const newUser = new db.User({ nama, roles, email, password });

  const savedUser = await newUser.save().catch((err: any) => {
    console.log("Error :", err);
    res.json({ error: " Cannot register user at the moment" });
  });

  if (savedUser) {
    res.json({ message: "Thanks for registering" });
  }

  // console.log(req.body);
  // res.json({ message: "hello" });
};

export const login = async (req: Request ,res: Response) => {
  const { email, password } = req.body;

  const userWithEmail = await db.User.findOne({ where: { email } }).catch((err: any) => {
    console.log("Error: ", err);
  });

  if (!userWithEmail) {
    return res.json({ 
      success: true, 
      message: "Email or Password does not match!",
      data: {}
    });
  }
  // console.log(password);
  // console.log(user.password);

  const match = await bcrypt.compare(password, userWithEmail.password);

  if (match) {
    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email },  process.env.JWT_SECRET || "");

    return res.json({ message: "Welcome back", name: userWithEmail.name, token: jwtToken, email: userWithEmail.email, roles: userWithEmail.roles});
  } else {
    // Passwords do not match
    return res.json({ message: "Password does not match!" });
  }

  // if (userWithEmail.password !== password) {
  //   return res.json({ message: "Email or Password does not match!" });
  // }
};

export const logout = async (req: Request, res: Response) => {

}


export const getUser = async (req: Request ,res: Response) => {
  try {
    const user_ = await db.User.findAll();
    res.send(user_);
  } catch (err) {
    console.log(err);
  }
};

export const testAuth = async (req: Request ,res: Response) => {
  try {
    res.send("You have $1.000.000");
  } catch (err) {
    console.log(err);
  }
};

export const getUserByID = async (req: Request ,res: Response) => {
  try {
    const user_ = await db.User.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.send(user_[0]);
  } catch (err) {
    console.log(err);
  }
};

// Create logo baru
export const createUser = async (req: Request ,res: Response) => {
  try {
    await db.User.create(req.body);
    res.json({
      message: `User created`,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update founder berdasarkan id
export const updateUserById = async (req: Request ,res: Response) => {
  try {
    await db.User.update(req.body, {
      where: {
        user_id: req.params.user_id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (err) {
    console.log(err);
  }
};

// Delete product berdasarkan id
export const deleteUserByID = async (req: Request ,res: Response) => {
  try {
    await db.User.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.json({
      message: "User Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDecodedToken = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  const token = authHeader.slice(7); // Remove "Bearer " from the token
  const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

  return decodedToken as JwtPayload;
}