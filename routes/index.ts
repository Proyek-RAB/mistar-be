import { Router } from "express";
import InfrastructureRouter from "./infrastructure";
import InfrastructureTypeRouter from "./infrastructuretype";
import InfrastructureSubTypeRouter from "./infrastructuresubtype";
import UserRouter from "./user";
import infrastructure_edit_history from "./infrastructurehistoryedit";
import InfrastructureRequest from "./infrastructurerequest";

const router = Router();

router.use('/infrastructure', [
    InfrastructureRouter,
    InfrastructureTypeRouter,
    InfrastructureSubTypeRouter,
    infrastructure_edit_history,
    InfrastructureRequest
]);

router.use('/user', [
    UserRouter,
])

// router.use('/infrastructure/type', InfrastructureTypeRouter);
// router.use('/infrastructure/type/sub', InfrastructureSubTypeRouter);

export default router;