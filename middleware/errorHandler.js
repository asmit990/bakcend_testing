const galti = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
    switch (statusCode) {
      case 400:
        res.status(400).json({
          title: "Validation Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
  
      case 404:
        res.status(404).json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
  
      default:
        res.status(statusCode).json({
          title: "Something went wrong",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
    }
  };
  
  module.exports = galti;
  