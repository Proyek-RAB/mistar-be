'use strict';
import { Model, Sequelize, UUID } from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import { ReqStatus } from '../enums/status.enum';

type InfrastructureReqAttr = {
  id: string,
  // infrastructure_id: string,
  // user_id:string,
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
    // infrastructure_id!: string;
    // user_id!:string;
    status!: ReqStatus;

    static associate(models: any) {
      // define association here
      // one to many relationship, need to define belongsTo and hasMany together
      infrastructure_request.belongsTo(models.User, {
        foreignKey: "user_id"
      });
      models.User.hasMany(infrastructure_request, {
        foreignKey: "user_id"
      });

      //for one to one, we just need belongsTo or hasOne, 
      infrastructure_request.belongsTo(models.Infrastructure, {
        foreignKey: "infrastructure_id"
      });
    }
  }

  infrastructure_request.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false,
      defaultValue: uuidv4()
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