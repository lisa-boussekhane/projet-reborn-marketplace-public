const { auth } = require ('../Models/user');

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
        if (!req.body.email || !req.body.password) {
                res.status(400).send({
                    status: false,
                    message: ''
                });
     } else {
                users.create({
                    email: req.body.email,
                    password: req.body.password,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    active: req.body.active,
                    role: req.body.role
                }).then((user) => res.status(201).send(user)).catch((error) => {
                    console.log(error);
                    res.status(400).send(error);
                });
            }
        },
};

module.exports = authController;

