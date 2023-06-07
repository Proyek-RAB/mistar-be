import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './models';
import {users} from './seeders/users';
import {infrastructures} from './seeders/infrastructures';
import {infrastructuretypes} from './seeders/infrastructurestypes';

const createInfrastructures = () => {
  infrastructures.map(infra => {
    db.Infrastructure.create(infra);
  })
}

const createInfrastructureType = () => {
  infrastructuretypes.map(infra => {
    db.InfrastructureType.create(infra);
  })
}

createInfrastructureType();
createInfrastructures();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is Running');
});
