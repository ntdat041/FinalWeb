const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      category_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      category_name: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      freezeTableName: true
    },
  );
  return Category;
};
