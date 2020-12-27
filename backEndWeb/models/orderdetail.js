const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.belongsTo(models.Order,{ foreignKey: 'order_id'});
      this.belongsTo(models.Product,{ foreignKey: 'product_id'});
    }
  }
  OrderDetail.init(
    {
      orderDetail_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false
      },
      priceEach: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
      },
      isRated: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'OrderDetail',
      freezeTableName: true
    },
  );
  return OrderDetail;
};
