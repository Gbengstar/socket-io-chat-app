const { Router } = require('express');
const { UserController } = require('../controller/userController');
const router = Router();

router.route('/sign-up').post(UserController.createAccount);
router.route('/login').post(UserController.login);

exports.AuthRouter = router;
