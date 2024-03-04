const { Op } = require('sequelize');
const { Shop, User, User_Rate_Shop } = require('../../Models');
const { sequelize } = require('../../Models/index');
const Sequelize = require('sequelize');

const ratingController = {
async getShopRating(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const ratings = await User_Rate_Shop.findAll({
        where: { shop_id: +id },
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //Sequelize.fn allows you to perform various SQL operations, including aggregation functions, directly within your queries. This feature is particularly useful for performing complex calculations, such as summing values, calculating averages, or finding minimum and maximum values within a dataset.//
        ],
        raw: true,
      });

      if (ratings.length > 0) {
        const averageRating = ratings[0].averageRating;
        res.json({ id, averageRating });
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
    const { id } = req.params;
    const { rating } = req.body; // Extracting rating and user_id from the request body
    const user_id = req.user_id;
    console.log('user id', user_id);
    try {
      // Create a new rating in the UserRateShop table
      await User_Rate_Shop.create({
        shop_id: +id,
        rating: +rating,
        user_id: +user_id,
      });

      // Response with a status code 201 indicating the resource (rating) has been created
      res.status(201).json({ message: 'Rating added successfully' });
    } catch (error) {
      console.error('Error adding rating:', error);
      res.status(500).send('An error occurred while adding the rating');
    }
  },

  async getAverageRating(req, res) {
    try {
      const { id } = req.params;

      const { rows } = await User_Rate_Shop.query(
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
