const { Op } = require('sequelize');
const { Shop, User, User_rate_shop } = require('../../Models');
const { sequelize } = require('../../Models/index');

const ratingController = {
  async getShopRating(req, res) {
    try {
      const { shop_id } = req.params;
      const ratings = await User_rate_shop.findAll({
        where: { shop_id: shop_id }, // Adjust the field name based on your model definition
        attributes: [
          [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
        ],
        raw: true,
      });

      if (ratings.length > 0) {
        const averageRating = ratings[0].averageRating;
        res.json({ shopId: id, averageRating });
      } else {
        res.status(404).send('Shop not found or no ratings available.');
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send('Server error occurred while fetching shop ratings.');
    }
  },

  async postShopRating(req, res) {
    const { shop_id } = req.params; // Assuming this is the shopId
    const { rating, user_id } = req.body; // Extracting rating and userId from the request body

    try {
      // Create a new rating in the UserRateShop table
      await User_rate_shop.create({
        shopId: shop_id,
        rating: rating,
        userId: user_id,
      });

      // Response with a status code 201 indicating the resource (rating) has been created
      res.status(201).send('Rating added successfully');
    } catch (error) {
      console.error('Error adding rating:', error);
      res.status(500).send('An error occurred while adding the rating');
    }
  },

  async getAverageRating(req, res) {
    try {
      const { id } = req.params;
      // Assuming User_rate_shop.query() returns a promise
      const { rows } = await User_rate_shop.query(
        'SELECT AVG(rating) as average FROM User_rate_shop WHERE product_id = $1 GROUP BY product_id',
        [id]
      );

      // If rows are returned, send the first row's average. If no rows, send "Not rated yet".
      res.json(rows[0] || { average: 'Not rated yet' });
    } catch (error) {
      // Handle errors that occur during the async operation
      console.error('Error while fetching average rating:', error.message);
      res
        .status(500)
        .json({ error: 'An error occurred while fetching the average rating' });
    }
  },
};

module.exports = ratingController;
