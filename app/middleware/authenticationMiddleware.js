const jwt = require('jsonwebtoken');
const { CustomError } = require('../helper/error');

const getToken = (req) => {
  if (!req.headers.authorization?.startsWith('Bearer')) {
    throw new CustomError(401, 'valid authorization token is required');
  }
  const authorizationHeader = req.headers.authorization;
  const [, token] = authorizationHeader.split(' ');

  if (!token) {
    throw new CustomError(401, 'please provide a valid JWT token');
  }
  return token;
};

exports.signToken = (username) => {
  const secret = process.env.JWT_SECRET;

  return jwt.sign(username, secret);
};

const decodeToken = (token) => {
  const secret = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, secret);
  console.log({ decodedToken });
  return decodedToken;
};

exports.AuthTokenMiddleware = (req, res, next) => {
  try {
    const token = decodeToken(getToken(req));

    req.token = { token };
    next();
  } catch (error) {
    throw new CustomError(404, 'invalid token');
  }
};

exports.decodeToken = decodeToken;
exports.getToken = getToken;
