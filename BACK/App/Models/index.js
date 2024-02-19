const user = require('./user');
const detail_product = require('./detail_product');
const media = require('./media');
const product = require('./product');
const shop = require('./shop');

// User and Shop (One-to-Many)
user.hasMany(shop, { foreignKey: 'user_id' });
shop.belongsTo(user, { foreignKey: 'user_id' });

// Product and Shop (Many-to-One)
shop.hasMany(product, { foreignKey: 'shop_id' });
product.belongsTo(shop, { foreignKey: 'shop_id' });

// Product and User (Many-to-Many through User_Order_Product)
product.belongsToMany(user, {
  through: 'User_Order_Product',
  foreignKey: 'product_id',
});
user.belongsToMany(product, {
  through: 'User_Order_Product',
  foreignKey: 'user_id',
});

// Product and DetailProduct (One-to-One)
product.hasOne(detail_product, { foreignKey: 'product_id' });
detail_product.belongsTo(product, { foreignKey: 'product_id' });

// Product and Media (One-to-Many)
product.hasMany(media, { foreignKey: 'product_id' });
media.belongsTo(product, { foreignKey: 'product_id' });


module.exports = { user, detail_product, shop, product, media };