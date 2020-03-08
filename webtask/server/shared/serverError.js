const serverErrorHandler = (res, error) => {
  return res.status(500).send({ error });
};

module.exports = serverErrorHandler;
