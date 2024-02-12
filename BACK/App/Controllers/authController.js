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
    try {
        const { first_name, last_name, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new user({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
        }
        }
};

module.exports = authController;
