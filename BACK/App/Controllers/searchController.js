const { Op } = require('sequelize');
const { product } = require('../Models/product');

const searchController = {
  searchReborns: async (req, res) => {
    try {
      const searchTerm = req.query.recherche;
      const results = await product.findAll({
        where: {
          title: { [Op.iLike]: `%${searchTerm}%` },
          kit_name: { [Op.iLike]: `%${searchTerm}%` },
        },
      });

      res.status(200).json({ results });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },
};

module.exports = searchController;
