const validation = (schema) => {
  return (req, res, next) => {
    console.log(req.body)
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
