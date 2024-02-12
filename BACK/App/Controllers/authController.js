const { auth } = require ('../Models/user');

const authController = {
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

