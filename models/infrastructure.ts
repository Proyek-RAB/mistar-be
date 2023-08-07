'use strict';
import {Model, Optional, Sequelize} from 'sequelize';
import db from '.';
import {v4 as uuidv4} from 'uuid';


type InfrastructureAttributes = {
  id: string,
  sub_type_id:number,
  name:string,
  details: Record<string, any>,
  // other attributes...
};

export interface InfrastructureInput extends Optional<InfrastructureAttributes, 'id'> {}
export interface InfrastructureOutput extends Required<InfrastructureAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Infrastructure extends Model<InfrastructureAttributes>
  implements InfrastructureAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    sub_type_id!: number;
    name!:string;
    details!: Record<string, any>;

    static associate(models: any) {
      // define association here
      models.InfrastructureSubType.hasMany(Infrastructure, {
        foreignKey: "sub_type_id"
      });
      Infrastructure.belongsTo(models.InfrastructureSubType, {
        foreignKey: "sub_type_id"
      });
    }

    static beforeUpdateHook(instance: Infrastructure, options: any) {
      // Perform any custom logic before updating the record
      console.log('Before Update Hook:', instance.name, instance.details);
      // You can modify the instance properties or perform other actions here
      // For example, you can update the "details" field before the update
      instance.details.lastUpdatedBy = 'Some User';
    }
  }
  Infrastructure.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    sub_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "InfrastructureSubType",
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Infrastructure',
    freezeTableName: true,
    timestamps: false,
    
  });

  Infrastructure.addHook('beforeUpdate', (infrastructure: Infrastructure, options: any) =>{
    try {
      console.log("beforeupdate")
      const previousData = infrastructure.toJSON();
      options.previousData = previousData;
    } catch (error) {
      console.error('Error beforeUpdate hook:', error);
    }
    
  })
  Infrastructure.addHook('afterUpdate', async (infrastructure: any, options: any) =>{
    try {
      console.log("this is afterupdate")
      const previousData = options.previousData;
      // console.log(previousData)
      // console.log(options)

      if (previousData) {
        // // Create a history record for each changed attribute
        // await db.infrastructure_edit_history.create({
        //   id: uuidv4(),
        //   infrastructure_id: infrastructure.id,
        //   user_id: options.userId,
        //   details: {
        //     previousData
        //   }
        // })
        console.log(Object.entries(infrastructure.toJSON()))
        for (const [key, value] of Object.entries(infrastructure.toJSON())) {
          if (previousData[key] !== value) {
            await db.infrastructure_edit_history.create({
              id: uuidv4(),
              infrastructure_id: previousData.id,
              user_id: options.userId,
              details: {
                previousData
              }
            });
          }
        }
      }

    Infrastructure.addHook("beforeCreate",async (infrastructure:Infrastructure, options: any) => {
      const infrastructureData = infrastructure.toJSON();

      
    })

    } catch (error) {
      
    }
  })

  return Infrastructure;
};


