'use strict';

import { UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";
import { UserStatus } from "../enums/roles.enum";

import {
  Model
} from 'sequelize';

type UserAttributes = {
  id: string,
  type: string, 
  name: string,
  email: string,
  password : string,
  roles: UserStatus, 
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    type!: string;
    name!: string;
    email!: string;
    password!:string;
    roles!: UserStatus;
    static associate(models: any) {
      // define association here
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    type: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate:async (user:any) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    sequelize,
    modelName: 'User',
    freezeTableName: true,
  });
  return User;
};