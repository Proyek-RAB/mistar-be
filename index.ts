import express, { Router, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './models';
import {users} from './seeders/users';
import {infrastructures} from './seeders/infrastructures';
import {infrastructuretypes} from './seeders/infrastructurestypes';
import routes from './routes';
import { paginatedResults } from './controllers/pagination';

// const createInfrastructures = () => {
//   infrastructures.map(infra => {
//     db.Infrastructure.create(infra);
//   })
// }

// const createInfrastructureType = () => {
//   infrastructuretypes.map(infra => {
//     db.InfrastructureType.create(infra);
//   })
// }

// createInfrastructureType();
// createInfrastructures();

const user = [
  {id: 1, name : 'User1'},
  {id: 2, name : 'User2'},
  {id: 3, name : 'User3'},
  {id: 4, name : 'User4'},
  {id: 5, name : 'User5'},
  {id: 6, name : 'User6'},
  {id: 7, name : 'User7'},
  {id: 8, name : 'User8'},
  {id: 9, name : 'User9'},
  {id: 10, name : 'User10'},
  {id: 11, name : 'User11'},
  {id: 12, name : 'User12'},
  {id: 13, name : 'User13'},
  {id: 14, name : 'User14'},
]

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


app.use('/api/v1', routes);