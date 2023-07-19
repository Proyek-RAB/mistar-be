import express, { Router, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './models';
import {users} from './seeders/users';
import {infrastructures} from './seeders/infrastructures';
import {infrastructuretypes } from './seeders/infrastructurestypes';
import { infrastructuresubtype } from './seeders/infrastructuresubtype';
import routes from './routes';
import { paginatedResults } from './controllers/pagination';
import { join } from 'path';
import bodyParser from 'body-parser';
// const myPassport = require("./auth/passport.js").myPassport;
import  myPassport from './auth/passport';
import { bypassAuthMiddleware } from './auth/authMiddleware';


// const createInfrastructureType = () => {
//   infrastructuretypes.map(infra => {
//     db.InfrastructureType.create(infra);
//   })
// }
// createInfrastructureType();

// const createInfrastructureSubType = () => {
//   infrastructuresubtype.map(infra => {
//     db.InfrastructureSubType.create(infra);
//   })
// }
// createInfrastructureSubType();

// const createInfrastructures = () => {
//   infrastructures.map(infra => {
//     db.Infrastructure.create(infra);
//   })
// }
// createInfrastructures();

// const createUser = () => {
//   users.map(user => {
//     db.User.create(user);
//   })
// }
// createUser();

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
// app.use(bypassAuthMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is Running');
});

app.use('/api/v1', routes);
// Serve static files
app.use('/api/v1/static' ,express.static(join(__dirname, 'public')));