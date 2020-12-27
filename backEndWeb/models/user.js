const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id :{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      sex: DataTypes.STRING,
      DOB: DataTypes.DATE,
      phonenumber: DataTypes.STRING,
      avatar: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User',
      freezeTableName: true
    },
  );
  return User;
};
