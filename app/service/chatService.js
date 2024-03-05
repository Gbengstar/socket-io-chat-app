const { CustomError } = require('../helper/error');
const { ChatModel } = require('../model/chatModel');

class ChatService {
  static async createChat({ chat, user1, user2 }) {
    return ChatModel.create({ chat, user1, user2 });
  }

  static async create({ chat, user1, user2 }) {
    const chatCreated = await ChatModel.create({ chat, user1, user2 });

    return chatCreated;
  }

  static async find({ chat }) {
    const chatCreated = await ChatModel.findOne({ username });

    if (!chatCreated) throw new CustomError(404, 'user not found');

    return chatCreated;
  }
}

exports.ChatService = ChatService;
