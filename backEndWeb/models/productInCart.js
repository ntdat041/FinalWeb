const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class ProductInCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.belongsTo(models.User,{ foreignKey: 'user_id'});
      this.belongsTo(models.Product,{ foreignKey: 'product_id'});
    }
  }
  ProductInCart.init(
    {
      productInCart_id : {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'ProductInCart',
      freezeTableName: true
    },
  );
  return ProductInCart;
};