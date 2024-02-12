const { user } = require ('../Models/user');

const userController = {
    async getUserInfos (req, res){
        try{
              
            const userId = req.params.id;
            const user = await user.findByPk(userId, {
            include: 'first_name', 'last_name', 'username', 'email', 'password', 'date_of_birth', 'phone', 'address', 'zip_code', 'city', 'state', 'role', 'duns', 'rating'
            });
        
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