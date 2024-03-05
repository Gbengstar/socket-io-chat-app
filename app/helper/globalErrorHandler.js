exports.globalExportHandler = (error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ data: error.message || 'internal error' });
};
