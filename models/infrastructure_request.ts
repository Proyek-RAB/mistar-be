'use strict';
import { Model, Sequelize, UUID } from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import { ReqStatus } from '../enums/status.enum';

type InfrastructureReqAttr = {
  id: string,
  infrastructure_id: string,
  user_id:string,
  status: ReqStatus,
  // other attributes...
};

module.exports = (sequelize:any, DataTypes: any) => {
  class infrastructure_request extends Model
  implements InfrastructureReqAttr {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    infrastructure_id!: string;
    user_id!:string;
    status!: ReqStatus;

    static associate(models: any) {
      // define association here
      infrastructure_request.belongsTo(models.User, {
        foreignKey: "user_id"
      });
      models.User.hasMany(infrastructure_request, {
        foreignKey: "user_id"
      });

      infrastructure_request.hasOne(models.Infrastructure, {
        foreignKey: 'infrastructure_id'
      });
      models.Infrastructure.belongsTo(infrastructure_request)


    }
  }
  infrastructure_request.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false,
      defaultValue: uuidv4()
    },
    infrastructure_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references:{
        model: "Infrastructure",
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ReqStatus)),
      allowNull: false, 
    }
  }, {
    sequelize,
    modelName: 'infrastructure_request',
    freezeTableName: true, 
    timestamps: false
  });
  return infrastructure_request;
};