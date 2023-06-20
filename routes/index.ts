import { Router } from "express";
import InfrastructureRouter from "./infrastructure";

const router = Router();

router.use('/infrastructure', InfrastructureRouter);

export default router;