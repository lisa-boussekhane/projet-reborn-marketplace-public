const { Model, DataTypes, INTEGER, BOOLEAN } = require('sequelize');

const sequelize = require('./sequelize');

class Product extends Model {}

Product.init(
  {
    unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kit_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sculptor: {
      type: INTEGER,
      allowNull: false,
    },
    size: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: INTEGER,
      allowNull: false,
    },
    age_range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authenticity_card: {
      type: BOOLEAN,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    shipping_fees: {
      type: INTEGER,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Product.markAsSold = async function (productId) {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  product.sold = true;
  await product.save();
};

module.exports = Product;
