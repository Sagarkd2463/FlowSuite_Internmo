export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.membership) {
      return res.status(403).json({
        success: false,
        message: "Organization membership is required",
      });
    }

    if (!allowedRoles.includes(req.membership.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
