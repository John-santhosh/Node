// const userDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const User = require("../model/User");

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log({ cookies });

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  // const foundUser = userDB.users.find((usr) => {
  //   return usr.refreshToken === refreshToken;
  // });
  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log({ foundUser });

  if (!foundUser) return res.sendStatus(403); // forbidden
  const roles = Object.values(foundUser.roles);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log({ decoded });
    if (err || foundUser.userName !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        userInfo: {
          userName: decoded.userName,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
