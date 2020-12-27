const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here

    }
  }
  Shop.init(
    {
      shop_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Shop',
      freezeTableName: true
    },
  );
  return Shop;
};
