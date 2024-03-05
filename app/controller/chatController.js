const uuid = require('uuid');
const { ChatService } = require('../service/chatService');

class ChatController {
  static createChat = async (req, res) => {
    const { user } = req.body;
    const { token } = req.token;

    const chat = uuid.v4();

    const chatCreated = await ChatService.create({
      chat,
      user1: token,
      user2: user,
    });

    res.status(201).json({ data: { chat: chatCreated } });
  };
}

exports.ChatController = ChatController;
