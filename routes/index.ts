import { Router } from "express";
import InfrastructureRouter from "./infrastructure";
import InfrastructureTypeRouter from "./infrastructuretype";
import InfrastructureSubTypeRouter from "./infrastructuresubtype";
import UserRouter from "./user";
import infrastructure_edit_history from "./infrastructurehistoryedit";

const router = Router();

router.use('/infrastructure', [
    InfrastructureRouter,
    InfrastructureTypeRouter,
    InfrastructureSubTypeRouter,
    infrastructure_edit_history
]);

router.use('/user', [
    UserRouter,
])

// router.use('/infrastructure/type', InfrastructureTypeRouter);
// router.use('/infrastructure/type/sub', InfrastructureSubTypeRouter);

export default router;