const { Op } = require('sequelize');
const { Product, Detail_product, Media } = require('../Models/');
const { sequelize } = require('../Models/index'); // Import Sequelize instance

const searchController = {
  searchReborns: async (req, res) => {
    try {
      const searchTerm = req.query.search;
      console.log(searchTerm);

      // recherche dans product
      const productResults = await Product.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${searchTerm}%` } },
            { kit_name: { [Op.iLike]: `%${searchTerm}%` } },
            { sculptor: { [Op.iLike]: `%${searchTerm}%` } },
            { age_range: { [Op.iLike]: `%${searchTerm}%` } },
            { type: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
        include: [{ model: Media, as: 'Media' }],
      });
      // recherche dans detail_product
      const detailProductResults = await Detail_product.findAll({
        where: {
          [Op.or]: [
            { gender: { [Op.iLike]: `%${searchTerm}%` } },
            { eyes: { [Op.iLike]: `%${searchTerm}%` } },
            { hair: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
        include: [
          {
            model: Product,
            as: 'Product',
            attributes: ['id', 'title'],
            include: [{ model: Media, as: 'Media' }],
          },
        ],
      });
      // Extract and format results from productResults
      const productResultsFormatted = productResults.map((result) => ({
        id: result.id,
        title: result.title,
        photo: result.Media ? result.Media[0].photo : null, // Access the first element of the Media array
      }));
      // Extract and format results from detailProductResults
      const detailProductResultsFormatted = detailProductResults.map(
        (result) => ({
          id: result.Product.id,
          title: result.Product.title,
          photo: result.Product.Media ? result.Product.Media[0].photo : null, // Access the first element of the Media array
        })
      );

      // combiner les tésultats en un seul tableau
      const uniqueResults = [
        ...productResultsFormatted,
        ...detailProductResultsFormatted,
      ];
      // enlever les doublons
      const uniqueResultsMap = new Map();
      uniqueResults.forEach((result) => {
        uniqueResultsMap.set(result.id, result);
      });
      // convertir de nouveau en un tableau
      const formattedResults = Array.from(uniqueResultsMap.values());
      res.status(200).json({ results: formattedResults });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'an unexpected error occurred...' });
    }
  },
};

module.exports = searchController;
