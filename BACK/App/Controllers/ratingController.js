const { Op } = require('sequelize');
const { Shop, User, User_rate_shop} = require('../Models/');
const { sequelize } = require('../Models/index'); 

const ratingController = {
async getShopRating(req, res) {
        try {
            const { shop_id } = req.params; 
            const ratings = await User_rate_hop.findAll({
                where: { shop_id: shop_id }, // Adjust the field name based on your model definition
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
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
            res.status(500).send('Server error occurred while fetching shop ratings.');
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

  };


module.exports = ratingController;