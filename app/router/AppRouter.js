const { Router } = require('express');
const { UserController } = require('../controller/userController');
const { AuthRouter } = require('./AuthRouter');
const { ChatRouter } = require('./chatRouter');
const { MessageRouter } = require('./MessageRouter');
const router = Router();

router.use('/auth', AuthRouter);
router.use('/chat', ChatRouter);
router.use('/message', MessageRouter);

exports.AppRouter = router;
