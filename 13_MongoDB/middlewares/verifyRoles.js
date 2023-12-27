const verifyRoles = (...allowedRoles) => {
  // the allowedRoles list array is compared with the current user role array to check if the user is authorized to perform next().
  return (req, res, next) => {
    if (!req.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log({ rolesArray });
    console.log(req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
