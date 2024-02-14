const { Op } = require('sequelize');
const product = require('../Models/product');

const searchController = {
  searchReborns: async (req, res) => {
    try {
      const searchTerm = req.query.search;
      console.log(searchTerm);
      const results = await product.findAll({
        where: {
          title: { [Op.iLike]: `%${searchTerm}%` },
          // kit_name: { [Op.iLike]: `%${searchTerm}%` },
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

// const { Op, QueryTypes, sequelize } = require('sequelize');
// const product = require('../Models/product');

// const searchController = {
//   searchReborns: async (req, res) => {
//     try {
//       const searchTerm = await sequelize.query('SELECT * FROM `product`', {
//         type: QueryTypes.SELECT,
//       });
//       console.log(searchTerm);
//       const results = await product.findAll({
//         where: {
//           title: { [Op.iLike]: `%${searchTerm}%` },
//           // kit_name: { [Op.iLike]: `%${searchTerm}%` },
//         },
//       });

//       res.status(200).json({ results });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'an unexpected error occured...' });
//     }
//   },
// };

// module.exports = searchController;