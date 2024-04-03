import {Model, DataTypes, Sequelize} from 'sequelize';

interface UserAttributes {
  name: string;
  address: string;
  role: string;
}

class User extends Model<UserAttributes> {
  public name!: string;
  public address!: string;
  public role!: string;


  public static initModel(sequelize: Sequelize) {
    return User.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },

      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

}

export default User;
