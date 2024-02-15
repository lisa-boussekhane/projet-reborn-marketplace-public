const message = require('../Models/message');
const user = require('../Models/user');
const { sequelize } = require('../Models/index'); // Import Sequelize instance

const chatController = {
async getMessage(req, res) {
        try {
            // Extract message ID or other filters from request parameters or query
            const { messageId } = req.params.id; // Example for fetching a specific message
    
            // Fetch the message from the database, including user information
            // Adjust the include to match your association (e.g., sender, receiver)
            const message = await message.findByPk(messageId, {
                include: [
                    {
                        model: user,
                        as: 'sender', // Use the correct association alias for the sender
                        attributes: ['id', 'username', 'email'] // Specify attributes you want to include
                    },
                    {
                        model: user,
                        as: 'receiver', // Use the correct association alias for the receiver
                        attributes: ['id', 'username', 'email'] // Specify attributes you want to include
                    }
                ]
            });
    
            if (!message) {
                // If the message is not found, return a 404 Not Found response
                return res.status(404).json({
                    message: 'Message not found'
                });
            }
    
            // If the message is found, return it along with user information
            res.status(200).json(message);
        } catch (error) {
            // If there's an error, respond with a 500 status code and the error message
            res.status(500).json({
                message: 'Failed to retrieve message',
                error: error.message
            });
        }
    },

async sendMessage(req, res) {
        try {
            // Extract message and user information from request body
            const { content, senderId, receiverId } = req.body;
    
            // Create the message record in the database, associating it with the sender
            const newMessage = await message.create({
                content,
                senderId,
                receiverId, 
            });
    
            const sender = await user.findByPk(senderId);
            let receiver = receiverId;
            if (receiverId) {
                receiver = await user.findByPk(receiverId);
            }
    
            // Return the new message along with associated sender (and receiver) details
            res.status(201).json({
                message: 'Message sent successfully',
                data: {
                    content: newMessage.content,
                    sender: sender ? { id: sender.id, username: sender.username } : null, // null: If sender is falsy (meaning no user was found for the given senderId, possibly because the ID was invalid or the user does not exist), the ternary operation results in null. This indicates the absence of a valid sender in the response.
                    receiver: receiver ? { id: receiver.id, username: receiver.username } : null,
                }
            });
        } catch (error) {
            // If there's an error, return an error message
            res.status(500).json({
                message: 'Failed to send message',
                error: error.message
            });
        }
    }

  };
  
  module.exports = chatController;