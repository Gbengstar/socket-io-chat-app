class CustomError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

exports.CustomError = CustomError;
