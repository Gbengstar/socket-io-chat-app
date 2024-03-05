const { UserModel } = require('../model/userModel');
const { createHash } = require('../helper/hashManager');
const { CustomError } = require('../helper/error');

class UserService {
  static async createUser({ username, password }) {
    const hashPassword = await createHash(password);
    return UserModel.create({ username, password: hashPassword });
  }

  static async find({ username, password }) {
    const user = await UserModel.findOne({
      where: {
        username,
      },
    });

    if (!user) throw new CustomError(404, 'user not found');

    return user;
  }
}

exports.UserService = UserService;
