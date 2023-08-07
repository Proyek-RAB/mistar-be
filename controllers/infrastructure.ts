import {Op} from 'sequelize'
import { Request, Response } from 'express';
import db from '../models';
import { infrastructures } from '../seeders/infrastructures';
import { getPagingData } from './pagination';
import { createHistory } from './infrastructure_edit_history';
import jwt, { JwtPayload, Secret} from "jsonwebtoken";
import { ModuleResolutionKind } from 'typescript';
import {v4 as uuidv4} from 'uuid';
import { before } from 'lodash';
import { getDecodedToken } from './user';


const secretKey: Secret = process.env.JWT_SECRET || "";

export const getAllInfrastructure = async (req: Request, res: Response) => {
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
        
        const infrastructure = await db.Infrastructure.findAndCountAll({
            limit: size,
            offset: page*size,
        })
        // console.log(size,size*page)

        const {total_items, total_page, current_page, items } = getPagingData(infrastructure, page, size)
        
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

export const getInfrastructureByID = async (req: Request, res: Response) => {
    try {
        const infrastructure = await db.Infrastructure.findAll({
            where : {
                type_id: req.params.id
            }
        })
        // console.log(infrastructure[0])
        res.send(infrastructure)
    } catch (error) {
        res.send(error)
    }
}

//create new infrastructure.
export const createInfrastructures = async (req: Request, res: Response) => {
    try {
        await db.Infrastructure.create(req.body);
        res.status(201).json({ 
            msg: "Infrastructure Created" 
        });
      } catch (err) {
        console.log(err);
      }
}

export const getAllInfrastructureValue =async (req:Request, res:Response) => {
    try {
        const allItem = db.Infrastructure.findAll()
        return allItem;
    } catch (error) {
        console.log(error)
    }
}

//update infrastructure by ID
export const updateInfrastructure = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid or missing token' });
        }

        const token = authHeader.slice(7); // Remove "Bearer " from the token
        const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

        await db.Infrastructure.update(req.body, {
            where : {
                id: req.params.id,

            },
            individualHooks: true,
            userId: decodedToken['id']
        }); 

        res.send({
            satus: true, 
            message:  `Infrastructure ${req.params.id} updated`,
            data : {

            }
        })
        // res.send({
        //     status: true, 
        //     message: `Infrastructure ${req.params.id} updated`,
        //     data: {}
        // })

    } catch (error) {
        console.log(error)
    }
}
