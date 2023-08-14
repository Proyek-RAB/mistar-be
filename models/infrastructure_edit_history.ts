'use strict';
import { Model, Sequelize, UUID } from 'sequelize';
import {v4 as uuidv4} from 'uuid';

type InfrastructureHistoryEditAttr = {
  id: string,
  infrastructure_id: string,
  user_id:string,
  details:Record<string, any>,
  // other attributes...
};

module.exports = (sequelize:any, DataTypes: any) => {
  class infrastructure_edit_history extends Model
  implements InfrastructureHistoryEditAttr {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    infrastructure_id!: string;
    user_id!:string;
    details!: Record<string, any>;

    static associate(models: any) {
      // define association here
      models.Infrastructure.hasMany(infrastructure_edit_history, {
        foreignKey: "infrastructure_id"
      });
      infrastructure_edit_history.belongsTo(models.Infrastructure, {
        foreignKey: "infrastructure_id"
      });
    }
  }
  infrastructure_edit_history.init({
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
    details: {
      type: DataTypes.JSON,
      allowNull: false, 
    }
  }, {
    sequelize,
    modelName: 'infrastructure_edit_history',
    freezeTableName: true, 
    updatedAt: false, 
  });
  return infrastructure_edit_history;
};