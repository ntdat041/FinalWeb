const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.belongsTo(models.User,{ foreignKey: 'user_id'});
    }
  }
  Cart.init(
    {
      cart_id : {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      totalAmount: {
        type: Sequelize.DataTypes.BIGINT,
      },
      numOfProduct: {
        type: Sequelize.DataTypes.BIGINT,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Cart',
      freezeTableName: true
    },
  );
  return Cart;
};