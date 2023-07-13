'use strict';
import {
  Model,
} from 'sequelize';
import { getTokenSourceMapRange } from 'typescript';

type InfrastructureSubTypeAttributes = {
  id: number,
  type_id: number,
  name:string, 
  icon_url:string
  // other attributes...
};


module.exports = (sequelize: any, DataTypes: any) => {
  class InfrastructureSubType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    type_id!: number;
    name!:string;
    icon_url!:string

    static associate(models: any) {
      // define association here
      models.InfrastructureType.hasMany(InfrastructureSubType, {
        foreignKey: "type_id"
      });
      InfrastructureSubType.belongsTo(models.InfrastructureType, {
        foreignKey: "type_id"
      });
    }
  }
  InfrastructureSubType.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "InfrastructureType",
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    icon_url: {
      type: DataTypes.STRING, 
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'InfrastructureSubType',
    freezeTableName: true,
    timestamps: false,
  });
  return InfrastructureSubType;
};