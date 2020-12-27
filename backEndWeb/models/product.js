const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
        this.belongsTo(models.Category,{ foreignKey: 'category_id'});
        this.belongsTo(models.Shop,{ foreignKey: 'shop_id'});
    }
  }
  Product.init(
    {
      product_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      product_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      product_image: {
        type: Sequelize.DataTypes.STRING,
      },
      product_price: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
      },
      product_rating: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4
      },
      product_description: {
        type: Sequelize.DataTypes.STRING,
      },
      quantityInStock: {
        type: Sequelize.DataTypes.BIGINT,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      nosale: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Product',
      freezeTableName: true
    },
  );
  return Product;
};
