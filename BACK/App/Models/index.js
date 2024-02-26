const User = require('./user');
const Detail_product = require('./detail_product');
const Media = require('./media');
const Product = require('./product');
const Shop = require('./shop');
const User_Rate_Shop = require('./user_rate_shop');
const User_Order_Product = require('./user_order_product');

User.hasMany(Shop, { foreignKey: 'user_id' });
Shop.belongsTo(User, { foreignKey: 'user_id' });

Shop.hasMany(Product, { foreignKey: 'shop_id' });
Product.belongsTo(Shop, { foreignKey: 'shop_id' });

User_Order_Product.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'Buyer',
});



User_Order_Product.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'Seller',
});

User.belongsToMany(Product, {
  through: 'User_Order_Product',
  foreignKey: 'user_id',
  as: 'Seller', // utilisateur qui achète
  timestamps: false,
});

Product.belongsToMany(User, {
  through: 'User_Order_Product',
  foreignKey: 'product_id',
  as: 'Order', // utilisateur qui vend
  timestamps: false,
});

Product.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'Creator',
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

module.exports = {
  User,
  Detail_product,
  Shop,
  Product,
  Media,
  User_Rate_Shop,
  User_Order_Product,
};
