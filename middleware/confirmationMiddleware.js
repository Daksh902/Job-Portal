module.exports = (req, res, next) => {
    // Display confirmation dialog for update and delete operations
    res.locals.confirmation = {
      update: false,
      delete: false,
    };
  
    res.confirmUpdate = () => {
      res.locals.confirmation.update = true;
    };
  
    res.confirmDelete = () => {
      res.locals.confirmation.delete = true;
    };
  
    next();
  };
  