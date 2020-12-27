const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {

  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {

      // define association here
      this.belongsTo(models.User,{ foreignKey: 'user_id'});
      this.belongsTo(models.Shop,{ foreignKey: 'shop_id'});
    }
  }
  Order.init(
    {
      order_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false
      },
      orderDate: {
        type: Sequelize.DataTypes.DATE,
      },
      receivedDate: {
        type: Sequelize.DataTypes.DATE,
      },
      requiredDate: {
        type: Sequelize.DataTypes.DATE,
      },
      shippedDate: {
        type: Sequelize.DataTypes.DATE,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'processing'
      },
      comment: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      phonenumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Order',
      freezeTableName: true
    },
  );
  return Order;
};

