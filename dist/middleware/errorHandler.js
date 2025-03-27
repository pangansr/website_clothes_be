"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res) => {
    const statusCode = res.statusCode || 500;
    console.log(error.message);
    res.status(statusCode).json({
        error: {
            message: error.message,
            stack: error.stack,
        },
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map