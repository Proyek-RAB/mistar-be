'use strict';
import {Model, Optional} from 'sequelize';

type InfrastructureAttributes = {
  id: string,
  type_id: number,
  type_name: string,
  description: Record<string, any>,
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
    type_id!: number;
    type_name!: string;
    description!: Record<string, any>;

    static associate(models: any) {
      // define association here
      models.InfrastructureType.hasMany(Infrastructure, {
        foreignKey: "type_id"
      });
      Infrastructure.belongsTo(models.InfrastructureType);
    }
  }
  Infrastructure.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references:{
        model: "InfrastructureTypes",
        key: 'id'
      }
    },
    type_name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    description: {
      type: DataTypes.JSON,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Infrastructure',
  });
  return Infrastructure;
};