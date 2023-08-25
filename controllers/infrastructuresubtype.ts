import {Op} from 'sequelize'
import { Request, Response } from 'express';
import db from '../models';
import { getPagingData } from './pagination';

export const getAllInfrastructureSubType = async (req: Request, res: Response) => {
    try {
        const InfrastructureSubType = await db.InfrastructureSubType.findAll({
            order: [
                ['id','ASC']
            ]
        })
        res.send({
            status: "success",
            message: "Infrastructure Sub Type",
            data : {InfrastructureSubType}})
    } catch (error) {
        console.log(error)
    }
}

export const getInfrastructureSubTypeByID = async (req: Request, res: Response) => {
    try {
        const InfrastructureSubType = await db.InfrastructureSubType.findAll({
            where : {
                type_id: req.params.id
            }
        })
        // console.log(InfrastructureSubType[0])
        res.send(InfrastructureSubType)
    } catch (error) {
    }
}
