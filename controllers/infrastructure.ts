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
        console.log(size,size*page)

        const {total_items, total_page, current_page,items } = getPagingData(infrastructure, page, size)
        
        res.send({
            "total_items": 4,
            "total_page": 1,
            "page": 1,
            "items": [
              {
                "type": "air_bersih",
                "name": "Titik Air Bersih Rumah Pak Yoga",
                "description": {
                  "ownership": "sendiri",
                  "source": "sumur_air_tanah",
                  "service_scope": {
                    "capacity": 200.5,
                    "kk_count": 1,
                    "people_count": 10
                  },
                  "monthly_service_bill": 190.5,
                  "contact_person": "+628121443294"
                }
              },
              {
                "type": "air_bersih",
                "name": "Titik Air Bersih RW 06",
                "description": {
                  "ownership": "bersama",
                  "stakeholder": "Pengurus RW",
                  "source": "pdam",
                  "service_scope": {
                    "capacity": 2000,
                    "kk_count": 20,
                    "people_count": 100
                  },
                  "monthly_service_bill": 2000000,
                  "contact_person": "+62812211321"
                }
              },
              {
                "type": "air_kotor",
                "name": "Jamban RW 06",
                "description": {
                  "ownership": "bersama",
                  "stakeholder": "Pengurus RW",
                  "toilet_type": "plengsengan",
                  "water_processing_type": "septic_tank",
                  "service_scope": {
                    "capacity": 100,
                    "kk_count": 20,
                    "people_count": 100
                  },
                  "monthly_service_bill": 50000,
                  "contact_person": "+628190202312"
                }
              },
              {
                "type": "titik_persampahan",
                "name": "Titik Pembuangan Sampah RW 06",
                "description": {
                  "ownership": "bersama",
                  "stakeholder": "Pengurus RW",
                  "waste_type": "tps",
                  "waste_processing_type": "individual_langsung",
                  "service_scope": {
                    "capacity": 1000,
                    "kk_count": 20,
                    "people_count": 100
                  },
                  "monthly_service_bill": 100000,
                  "contact_person": "+62812102293"
                }
              }
            ]
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
        console.log(infrastructure[0])
        res.send(infrastructures[0])
    } catch (error) {
    }
}

export const createInfrastructure = async (req: Request, res: Response) => {
    res.send({
        "message": "infrastructure has been succesfully created",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    })
}

export const getInfrastructureTypeList = async (req: Request, res: Response) => {
    res.send([
        {
          "id": 1,
          "type": "titik",
          "icon_url": "https://www.myimage/titik_icon.svg",
          "sub_type": [
            "air_bersih",
            "air_limbah"
          ]
        },
        {
          "id": 2,
          "type": "garis",
          "icon_url": "https://www.myimage/garis_icon.svg",
          "sub_type": [
            "jalan",
            "drainase"
          ]
        }
      ])
}

export const getInfrastructureSubTypeList = async (req: Request, res: Response) => {
    res.send([
        {
          "id": 1,
          "sub_type": "air_bersih",
          "icon_url": "https://www.myimage.com/air_bersih_icon.svg"
        },
        {
          "id": 2,
          "sub_type": "air_kotor",
          "icon_url": "https://www.myimage.com/air_kotor_icon.svg"
        }
      ])
}