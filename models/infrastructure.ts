'use strict';
import {Model, Optional} from 'sequelize';

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
  }
  Infrastructure.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
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
  return Infrastructure;
};