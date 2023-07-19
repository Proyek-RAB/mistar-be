import { Router } from "express";
import InfrastructureRouter from "./infrastructure";
import InfrastructureTypeRouter from "./infrastructuretype";
import InfrastructureSubTypeRouter from "./infrastructuresubtype";
import UserRouter from "./user";

const router = Router();

router.use('/infrastructure', [
    InfrastructureRouter,
    InfrastructureTypeRouter,
    InfrastructureSubTypeRouter
]);

router.use('/user', [
    UserRouter,
])

// router.use('/infrastructure/type', InfrastructureTypeRouter);
// router.use('/infrastructure/type/sub', InfrastructureSubTypeRouter);

export default router;