
import { Request, Response } from 'express';
import db from '../models';
import jwt, { JwtPayload, Secret} from "jsonwebtoken";
import dotenv from 'dotenv';
import { infrastructures } from '../seeders/infrastructures';
import { getPagingData } from './pagination';

dotenv.config()
export const getPaginatedAllHistoryInfrastructure = async (req: Request, res: Response) => {
    try {
        const sizeAsNumber:number = parseInt(req.query.size as string);
        const pageAsNumber:number = parseInt(req.query.page as string);

        let page = 0;
        let size = 10; //default size for every page 10 items

        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            page = pageAsNumber;
        }
        
        const infrastructure_history = await db.infrastructure_edit_history.findAndCountAll({
            limit: size,
            offset: page*size,
        })
        // console.log(size,size*page)

        const {total_items, total_page, current_page,items } = getPagingData(infrastructure_history, page, size)
        
        res.send({
            total_items,
            total_page,
            current_page,
            items,
        })

    } catch (error) {
        console.log(error)
    }
}

const secretKey: Secret = process.env.JWT_SECRET || "";

export const getAllInfrastructureHistory = async (req: Request, res: Response) => {
    try {
        const infrastructure_history = await db.infrastructure_edit_history.findAll()
        // console.log(infrastructure[0])

        res.send({
            status: true,
            message: "get all infrastructure history endpoint",
            data: {
                infrastructure_history
            }})
    } catch (error) {
        res.send(error)
    }
}

//create new infrastructure.
export const createHistory = async (req: Request, res: Response, updatedInfra: any) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid or missing token' });
        }

        const token = authHeader.slice(7); // Remove "Bearer " from the token
        const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

        const infraHistory = {
            id:crypto.randomUUID,
            infrastructure_id: updatedInfra.id,
            user_id: decodedToken['id'],
            details: {
                updatedInfra
            }
        }

        await db.infrastructure_edit_history.create(infraHistory);
        res.send({ 
            msg: "Infrastructure History Created" 
        });
      } catch (err) {
        console.log(err);
      }
}

//update infrastructure by ID
export const updateInfrastructure = async (req: Request, res: Response) => {
    try {
        await db.Infrastructure.update(req.body, {
            where : {
                id: req.params.id
            }
        }); 

        const updatedInfra = await db.Infrastructure.findOne(req.body, {
            where: {
                id: req.params.id
            }
        })

        // const userWithEmail = await db.User.findOne({ where: { email } }).catch((err: any) => {
        //     console.log("Error: ", err);
        //   });

        res.send({
            status: true, 
            message: `Infrastructure ${req.params.id} updated`,
            data: {
                updatedInfra
            }
        })
    } catch (error) {
        
    }
}