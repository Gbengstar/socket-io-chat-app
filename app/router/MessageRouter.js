const { Router } = require('express');
const {
  AuthTokenMiddleware,
} = require('../middleware/authenticationMiddleware');
const { MessageController } = require('../controller/messageController');
const router = Router();

router.use(AuthTokenMiddleware);

router
  .route('/')
  .get(MessageController.getMessages)
  .delete(MessageController.deleteMessages);

exports.MessageRouter = router;
