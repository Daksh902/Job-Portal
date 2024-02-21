module.exports = (req, res, next) => {
    res.locals.errors = [];
  
    res.validateForm = (fields) => {
      fields.forEach((field) => {
        if (!req.body[field]) {
          res.locals.errors.push(`The '${field}' field is required.`);
        }
      });
    };
  
    next();
  };
  