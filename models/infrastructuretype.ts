'use strict';
import {
  Model
} from 'sequelize';

type InfrastructureTypeAttributes = {
  id: number,
  name: string,
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class InfrastructureType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!:string;

    static associate(models: any) {
      // define association here
      models.InfrastructureType.hasMany(models.Infrastructure, {
        foreignKey: "type_id"
      });
      models.Infrastructure.belongsTo(models.InfrastructureType);
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
    }
  }, {
    sequelize,
    modelName: 'InfrastructureType',
  });
  return InfrastructureType;
};

