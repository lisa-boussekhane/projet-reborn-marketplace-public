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

            if ((name === undefined) && !name){
                return res.status(400).json({ message: 'you should provide at least a name'});
            }

            if (name){
                user.first_name = name;
            }
    
            await user.save();
    
            res.status(200).json(user);
    
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'an unexpected error occured...'});
        }  
    },

    async deleteAccount (req, res){
        try{
          const userId = req.params.id;
          const user = await user.findByPk(userId);
    
          if (!user){
            return res.status(404).json({ message: `user with id ${userId} not found.`});
          }
    
          await user.destroy();
    
          res.status(204).json();
    
        }catch (error){
          console.error(error);
          res.status(500).json({ message: 'an unexpected error occured...'});
        }   
      },
}

module.exports = userController;