import {Op} from 'sequelize'
import { Request, Response } from 'express';
import db from '../models';
import { infrastructures } from '../seeders/infrastructures';
import { getPagingData } from './pagination';

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

        const {total_items, total_page, current_page,items } = getPagingData(infrastructure, page, size)
        
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
        res.status(201).json({ msg: "Infrastructure Created" });
      } catch (err) {
        console.log(err);
      }
}