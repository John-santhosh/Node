const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  // console.log("john");
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find((usr) => {
    return usr.refreshToken === refreshToken;
  });

  if (!foundUser) res.sendStatus(403); // forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log({ decoded });
    if (err || foundUser.userName !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      { userName: decoded.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
