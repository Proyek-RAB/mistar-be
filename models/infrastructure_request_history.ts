'use strict';
import { timeStamp } from 'console';
import { Model, Sequelize, UUID } from 'sequelize';
import {v4 as uuidv4} from 'uuid';


type InfrastructureReqHistoryAttr = {
  id: string,
  infrastructure_id: string,
  admin_id:string,
  details:Record<string, any>,
  // other attributes...
};

module.exports = (sequelize:any, DataTypes: any) => {
  class infrastructure_request_history extends Model
  implements InfrastructureReqHistoryAttr {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    infrastructure_id!: string;
    admin_id!:string;
    details!: Record<string, any>;

    static associate(models: any) {
      // define association here
      infrastructure_request_history.hasOne(models.infrastructure_request, {
        foreignKey: "infrastructure_request_id"
      });
      models.infrastructure_request.belongsTo(infrastructure_request_history);    
    }
  }
  infrastructure_request_history.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false,
      defaultValue: uuidv4()
    },
    infrastructure_request_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references:{
        model: "infrastructure_request",
        key: 'id'
      }
    },
    admin_id : {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    detail : {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'infrastructure_request',
    freezeTableName: true, 
    updatedAt: false, 
  });

  
  return infrastructure_request_history;
};