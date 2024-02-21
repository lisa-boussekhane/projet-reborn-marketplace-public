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
          ],
        },
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
            include: [{ model: Media, as: 'media' }],
          },
        ],
      });

      // éviter les doublons dans les résultats
      // utilisation de spread operator pour créer une copie des deux tableaux avec les id et title des résultats de recherche
      const formattedResults = [
        ...productResults.map((result) => ({
          id: result.id,
          title: result.title,
        })),
        ...detailProductResults.map((result) => ({
          id: result.Product.id,
          title: result.Product.title,
        })),
      ];

      // Set permet de regrouper les deux tableaux temporairement pour vérifier si y a des doublons
      // obligation d'utiliser json.stringify pour transformer le tableau en chaine de caractères sinon set ne peut pas fonctionner
      // puis json.parse pour retransformer tout ça une fois les doublons enlevés en tableau d'objets

      const uniqueResults = Array.from(
        new Set(formattedResults.map((result) => JSON.stringify(result)))
      ).map((stringifiedResult) => JSON.parse(stringifiedResult));

      res.status(200).json({ results: uniqueResults });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'an unexpected error occurred...' });
    }
  },
};

module.exports = searchController;
