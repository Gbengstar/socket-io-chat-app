const { MessageService } = require('../service/messageService');
const Event = require('events');

exports.sendMessageHandler = async (data) => {
  console.log(data.chat, { data });
  try {
    await MessageService.createChat(data);
  } catch (error) {
    console.log(error);
  }
};

class MessageController {
  static getMessages = async (req, res) => {
    const { token } = req.token;
    const { username } = req.query;

    const messages = await MessageService.find(token + username);

    res.status(200).json({ messages });
  };

  static deleteMessages = async (req, res) => {
    const { token } = req.token;
    const { username, id } = req.query;

    const messages = await MessageService.delete({
      messageId: token + username,
      id,
    });

    res.status(200).json({ messages });
  };
}

exports.MessageController = MessageController;
