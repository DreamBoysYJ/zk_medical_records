import { DataTypes, Model, Sequelize } from 'sequelize';

interface UserAttributes {
  name: string;
  address: string;
  role: string;
}

interface UserCreationAttributes extends UserAttributes {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public name!: string;
  public address!: string;
  public role!: string;

  // You can also define extra methods or class level methods here if needed

  // Required for sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const initUserModel = (sequelize: Sequelize): void => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
};

export { User, initUserModel };
