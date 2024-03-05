const { CustomError } = require('../helper/error');
const { MessageModel } = require('../model/messageModel');

class MessageService {
  static async createChat({ sender, receiver, message }) {
    const [senderChat, receiverChat] = await Promise.all([
      MessageModel.create({
        messageId: sender + receiver,
        sender,
        receiver,
        message,
      }),
      MessageModel.create({
        messageId: receiver + sender,
        sender,
        receiver,
        message,
      }),
    ]);

    return [senderChat, receiverChat];
  }

  static async find(messageId) {
    return MessageModel.findAndCountAll({ where: { messageId } });
  }

  static async delete({ messageId, id }) {
    return MessageModel.destroy({ where: { messageId, id } });
  }
}

exports.MessageService = MessageService;
