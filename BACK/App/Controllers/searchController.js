const { Op } = require('sequelize');
const product = require('../Models/product');
const detail_product = require('../Models/detail_product');
const { sequelize } = require('../Models/index'); // Import Sequelize instance

const searchController = {
  searchReborns: async (req, res) => {
    try {
      const searchTerm = req.query.search;
      console.log(searchTerm);
      const results = await product.findAll({
        where: {
          title: { [Op.iLike]: `%${searchTerm}%` },
          kit_name: { [Op.iLike]: `%${searchTerm}%` },
        },
        include: [{ model: detail_product }],
      });

      res.status(200).json({ results });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },
};

module.exports = searchController;
