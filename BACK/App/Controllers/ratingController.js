const { Op } = require('sequelize');
const { Shop, User } = require('../Models/');
const { sequelize } = require('../Models/index'); 
const pool = require('../../Data');


const ratingController = {
async getShopRating(req, res) {
    const { id } = req.params;
    try {
        const { rows } = await PG_URL.PORT.query('SELECT * FROM User_Rate_Shop WHERE shop_id = $1', [id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error occurred while fetching shop ratings.');
    }
    },

async postShopRating(req, res) {
    const { id } = req.params;
    const { rating, userId } = req.body; // Extraction de l'évaluation et de l'ID de l'utilisateur depuis le corps de la requête

    try {
        await PG_URL.PORT.query(
            'INSERT INTO User_Rate_Product (product_id, rating, user_id) VALUES ($1, $2, $3)',
            [id, rating, userId]
        );

        // Réponse avec un code de statut 201 indiquant que la ressource (évaluation) a été créée
        res.status(201).send('Rating added successfully');
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).send('An error occurred while adding the rating');
    }
},

async calculateShopRating(req, res) {
    const { id } = req.params;
    try {
        // Exécution de la requête pour calculer la note moyenne du produit
        const { rows } = await PG_URL.PORT.query(
            'SELECT AVG(rating) as average FROM User_Rate_Shop WHERE shop_id = $1 GROUP BY shop_id',
            [id]
        );

        // Si des notes existent, renvoie la moyenne, sinon indique que le produit n'a pas encore été noté
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({ average: "Not rated yet" });
        }
    } catch (error) {
        // Gestion des erreurs en cas de problème avec la requête à la base de données
        console.error('Error fetching average rating:', error);
        res.status(500).send('An error occurred while fetching the average rating');
    }
}
  };


module.exports = ratingController;