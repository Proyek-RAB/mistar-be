import express,{ Router, Request, Response } from "express";
import { createUser, updateUserById, getUser, getUserByID, login } from "../controllers/user";

const UserRouter = Router();

UserRouter.get('/data', getUser)
UserRouter.get('/data/:id', getUserByID)
UserRouter.post('/data', createUser)

UserRouter.post('/login', login)


export default UserRouter;