const User = require('./user');
const Detail_product = require('./detail_product');
const Media = require('./media');
const Product = require('./product');
const Shop = require('./shop');
const User_Rate_Shop = require('./user_rate_shop')

// User and Shop (One-to-Many)
User.hasMany(Shop, { foreignKey: 'user_id' });
Shop.belongsTo(User, { foreignKey: 'user_id' });

// Product and Shop (Many-to-One)
Shop.hasMany(Product, { foreignKey: 'shop_id' });
Product.belongsTo(Shop, { foreignKey: 'shop_id' });

// Product and User (Many-to-Many through User_Order_Product)
Product.belongsToMany(User, {
  through: 'User_Order_Product',
  foreignKey: 'product_id',
  timestamps: false,
});
User.belongsToMany(Product, {
  through: 'User_Order_Product',
  foreignKey: 'user_id',
  timestamps: false,
});

// Product and DetailProduct (One-to-One)
Product.hasOne(Detail_product, { foreignKey: 'product_id' });
Detail_product.belongsTo(Product, { foreignKey: 'product_id' });

// Product and Media (One-to-Many)
Product.hasMany(Media, { foreignKey: 'product_id' });
Media.belongsTo(Product, { foreignKey: 'product_id' });

// Association many-to-many entre User et Shop via UserRateShop
User.belongsToMany(Shop, {
  through: 'User_Rate_Shop',
  foreignKey: 'user_id',
});
Shop.belongsToMany(User, {
  through: 'User_Rate_Shop',
  foreignKey: 'shop_id',
});

module.exports = { User, Detail_product, Shop, Product, Media };
