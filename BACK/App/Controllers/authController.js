const { auth } = require ('../Models/user');
const verifyToken = require('../Middlewares/authMiddleware');

const authController = {
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

async createUserAccount(req, res){
    
    try{
      const { content, position, list_id, color } = req.body;    

      const card = {};

      if (content === undefined || content === ""){
        return res.status(400).json({ message: 'content is mandatory'});
      }

      card.content = content;

      if (color){
        card.color = color;
      }

      let positionInt;
      if (position !== undefined){
        positionInt = Number(position);

        if (isNaN(positionInt)){
          return res.status(400).json({ message: 'position should be an integer'});
        }
        card.position = positionInt;
      }      

      listIdInt = Number(list_id);

      if (isNaN(listIdInt)){
        return res.status(400).json({ message: 'list_id should be an integer'});
      }
      card.list_id = listIdInt;

      const newCard = await Card.create(card);

      res.status(201).json(newCard);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  

  }
}

module.exports = authController;
