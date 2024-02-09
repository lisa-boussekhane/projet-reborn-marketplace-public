const { user } = require ('../Models/user');

const userController = {
    async getUserInfos (req, res){
        try{
              
            const userId = req.params.id;
            const user = await user.findByPk(userId, {
            include: 'first_name', 'last_name': 'username'
            });
        
            if (!user){
            return res.status(404).json({ message: `user with id ${userId} not found.`});
            }
        
            res.status(200).json(user);
        
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'an unexpected error occured...'});
        }
    },

    async updateAccount (req, res){
        try{
            // plan d'action :
            
            // trouver la liste :
            // - récupére l'id
            // - charger la liste
            // - si elle n'existe pas -> 404
    
            // vérfier que la requête contient les informations permettant une mise à jour
            // - on a au moins un nom ou une position
            // - la position est un nombre
            // - si problème -> 400
    
            // la mettre à jour
            // - par l'appel de la méthode save du modele liste
    
            // informer le client des modifications
            // - renvoyer une réponse avec un code 200,
            // - et les informations de la liste modifiée
    
            const userId = req.params.id;
            const user = await user.findByPk(userId);
    
            if (!user){
                return res.status(404).json({ message: `user with id ${userId} not found.`});
            }
    
            const { name } = req.body;    
    
            // on veut, si il est fournit un nom non vide
            if (name !== undefined && name === ""){
                return res.status(400).json({ message: 'name should not be an empty string'});
            }
    
            // on au moins, veut soit une position, soit un nom
            if ((name === undefined) && !name){
                return res.status(400).json({ message: 'you should provide at least a name or a position'});
            }
    
            // on s'est assuré que la requête est bien formée,
            // on se lance dans la mise à jour
            if (name){
                user.first_name = name;
            }
    
            await user.save();
    
            res.status(200).json(user);
    
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'an unexpected error occured...'});
        }  
    }
}

module.exports = userController;