const { CustomError } = require('../helper/error');
const { verifyHash } = require('../helper/hashManager');
const { signToken } = require('../middleware/authenticationMiddleware');
const { UserService } = require('../service/userService');

class UserController {
  static createAccount = async (req, res) => {
    const { username, password } = req.body;
    console.log({ username, password });

    const user = await UserService.createUser({ username, password });

    res.status(201).json({ data: user.username });
  };

  static login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.hostname);

    const user = await UserService.find({ username });

    const isValid = verifyHash(user.password, password);

    if (!isValid) throw new CustomError(401, 'invalid username or password');
    const token = signToken(user.username);

    res.status(200).json({ data: { username: user.username, token } });
  };
}

exports.UserController = UserController;
