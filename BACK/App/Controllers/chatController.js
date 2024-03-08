const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { Message, User, User_Discuss_Message } = require('../../Models');
const { Sequelize1 } = require('../../Models/index'); // Import Sequelize instance

const chatController = {
  async getMessage(req, res) {
    try {
      const senderId = req.user_id;
      const receiverId = req.params.id;
      const loggedUserId = req.user_id;
      // Fetch all messages in the specified discussion, including user information
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            Sequelize.literal(`
              ("discussion_id" IN (
                SELECT id FROM "User_Discuss_Message"
                WHERE ("user1_id" = ${senderId} AND "user2_id" = ${receiverId})
                OR ("user1_id" = ${receiverId} AND "user2_id" = ${senderId})
              ))
            `),
          ],
        },
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'username', 'email'],
          },
          {
            model: User,
            as: 'receiver',
            attributes: ['id', 'username', 'email'],
          },
        ],
        order: [['created_at', 'ASC']],
      });

      // si aucun message n'est trouvé, retourné un tableau vide
      if (!messages || messages.length === 0) {
        return res.status(404).json({
          message: 'No messages found in the specified discussion',
        });
      }

      // si des messages sont trouvés, les retourner
      res.status(200).json({
        messages,
        loggedUserId: loggedUserId,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve messages',
        error: error.message,
      });
    }
  },

  async sendMessage(req, res) {
    try {
      const senderId = req.user_id;
      const receiverId = req.params.id;
      const { content } = req.body;

      // Trouver ou créer la discussion entre l'expéditeur et le destinataire
      let discussion = await User_Discuss_Message.findOne({
        where: {
          [Op.or]: [
            { user1_id: senderId, user2_id: receiverId },
            { user1_id: receiverId, user2_id: senderId },
          ],
        },
      });

      if (!discussion) {
        discussion = await User_Discuss_Message.create({
          user1_id: senderId,
          user2_id: receiverId,
        });
      }

      // Créer le message associé à la discussion
      const newMessage = await Message.create({
        content: content,
        sender_id: senderId,
        receiver_id: receiverId,
        discussion_id: discussion.id,
      });

      res.status(201).json({
        message: 'Message sent successfully',
        newMessage,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to send message',
        error: error.message,
      });
    }
  },

  async getAllMessages(req, res) {
    try {
      const userId = req.user_id;

      // Fetch all discussions for the current user
      const discussions = await User_Discuss_Message.findAll({
        where: {
          [Op.or]: [{ user1_id: userId }, { user2_id: userId }],
        },
        include: [
          { model: User, as: 'User1', attributes: ['id', 'username'] },
          { model: User, as: 'User2', attributes: ['id', 'username'] },
          {
            model: Message,
            as: 'Messages',
            attributes: ['content'],
            limit: 1,
            order: [['created_at', 'DESC']],
          },
        ],
        order: [['updated_at', 'DESC']], // Ordonnez par la date de dernière mise à jour
      });

      // Mise en forme des données pour les renvoyer au client
      const formattedDiscussions = discussions.map((discussion) => {
        const otherUser =
          discussion.user1_id === userId ? discussion.User2 : discussion.User1;

        const lastMessageContent =
          discussion.Messages.length > 0
            ? discussion.Messages[0].content
            : null;
        return {
          id: discussion.id,
          otherUser: {
            id: otherUser.id,
            username: otherUser.username,
          },
          content: lastMessageContent,
        };
      });

      res.json(formattedDiscussions);
    } catch (error) {
      console.error('Failed to retrieve discussions:', error);
      res
        .status(500)
        .json({ message: 'Failed to get discussions', error: error.message });
    }
  },
};

module.exports = chatController;
