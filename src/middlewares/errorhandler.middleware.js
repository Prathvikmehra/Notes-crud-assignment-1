// Create first Step 1 error handler middleware

function errorHandler(err, req, res, next) {

    const statusCode = err.status || 500;

    res.status(statusCode).json({ msg: err.message });

    // next(err)

}

module.exports = errorHandler;