import {Op} from 'sequelize'
import { Request, Response } from 'express';
import db from '../models';
import { getPagingData } from './pagination';

export const getAllInfrastructureType = async (req: Request, res: Response) => {
    try {
        const InfrastructureType = await db.InfrastructureType.findAll({
            order: [
                ['id','ASC']
            ]
        })
        res.send({
            status: "success",
            message: "Infrastructure Type",
            data : InfrastructureType
        })
    } catch (error) {
        console.log(error)
    }
}

export const getInfrastructureTypeByID = async (req: Request, res: Response) => {
    try {
        const InfrastructureType = await db.InfrastructureType.findAll({
            where : {
                type_id: req.params.id
            }
        })
        // console.log(InfrastructureType[0])
        res.send(InfrastructureType)
    } catch (error) {
    }
}
