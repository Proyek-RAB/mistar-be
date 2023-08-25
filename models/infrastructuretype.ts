'use strict';
import {
  Model
} from 'sequelize';

type InfrastructureTypeAttributes = {
  id: number,
  name: string,
  icon_url:string,
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class InfrastructureType extends Model 
  implements InfrastructureTypeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!:string;
    icon_url!:string;
    static associate(models: any) {
      // define association here
      // models.InfrastructureType.hasMany(models.infrastructuresubtype, {
      //   foreignKey: "type_id"
      // });
    }
  }
  
  InfrastructureType.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true, 
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
    modelName: 'InfrastructureType',
    freezeTableName: true,
    timestamps: false,
  });
  return InfrastructureType;
};

