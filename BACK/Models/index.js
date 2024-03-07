const User = require('./user');
const Detail_product = require('./detail_product');
const Media = require('./media');
const Product = require('./product');
const Shop = require('./shop');
const User_Rate_Shop = require('./user_rate_shop');
const User_Order_Product = require('./user_order_product');
const Message = require('./message');
const Discussion = require('./discussion');

User.hasMany(Shop, { foreignKey: 'user_id' });
Shop.belongsTo(User, { foreignKey: 'user_id' });

Shop.hasMany(Product, { foreignKey: 'shop_id' });
Product.belongsTo(Shop, { foreignKey: 'shop_id' });

User_Order_Product.belongsTo(Product, { foreignKey: 'product_id' });
User_Order_Product.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
User_Order_Product.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

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

Message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
});

Message.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

User.hasMany(Discussion, { foreignKey: 'user1_id' });
User.hasMany(Discussion, { foreignKey: 'user2_id' });

Discussion.belongsTo(User, { foreignKey: 'user1_id', as: 'User1' });
Discussion.belongsTo(User, { foreignKey: 'user2_id', as: 'User2' });
Discussion.hasMany(Message, { foreignKey: 'discussion_id' });

Message.belongsTo(Discussion, { foreignKey: 'discussion_id' });

module.exports = {
  User,
  Detail_product,
  Shop,
  Product,
  Media,
  User_Rate_Shop,
  User_Order_Product,
  Message,
  Discussion,
};
