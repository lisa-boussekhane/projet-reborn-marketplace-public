const { user } = require ('../Models/user');

const userController = {
    async getUserInfos (req, res){
        try{
              
            const userId = req.params.id;
            const user = await user.findByPk(userId);
        
            if (!user){
            return res.status(404).json({ message: `user with id ${userId} not found.`});
            }
        
            res.status(200).json(user);
        
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'an unexpected error occured...'});
        }
    }
      
}

module.exports = userController;