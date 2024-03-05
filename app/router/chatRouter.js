const { Router } = require('express');
const { ChatController } = require('../controller/chatController');
const {
  AuthTokenMiddleware,
} = require('../middleware/authenticationMiddleware');
const router = Router();

router.use(AuthTokenMiddleware);

router.route('/').post(ChatController.createChat);

exports.ChatRouter = router;
