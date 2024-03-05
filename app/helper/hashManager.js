const { randomBytes, scrypt } = require('crypto');
const { promisify } = require('util');
const { CustomError } = require('./error');

const asyncScript = promisify(scrypt);

/**
 *
 * @param value the string to be hashed
 * @returns returns string
 */

exports.createHash = async (value) => {
  if (!value) throw new CustomError(400, 'no value supplied for hashing');
  const salt = randomBytes(8).toString('hex');
  const hashedPass = await asyncScript(value, salt, 64);
  return `${hashedPass.toString('hex')}.${salt}`;
};

/**
 *
 * @param hash hash coming from database
 * @param value value that the user supply
 * @returns returns a boolean
 */
exports.verifyHash = async (hash, value) => {
  if (!(hash && value))
    throw new CustomError(400, 'no password supplied for authentication');
  const [storedHashPass, salt] = hash.split('.');
  const hashedPass = await asyncScript(value, salt, 64);

  return hashedPass.toString('hex') === storedHashPass;
};
