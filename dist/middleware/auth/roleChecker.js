"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleChecker = (rolesAllowed) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (rolesAllowed.includes(userRole)) {
            next();
        }
        else {
            res.status(401);
            throw new Error("Action not allowed, Unauthorized role!");
        }
    };
};
exports.default = roleChecker;
//# sourceMappingURL=roleChecker.js.map