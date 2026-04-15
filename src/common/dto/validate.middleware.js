const validate = (Schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await Schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;
