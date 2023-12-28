const User = require("../model/User");

const handleLogout = async (req, res) => {
  // $$$$ on Client/FE, also delete the access

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // success but no content
  const refreshToken = cookies.jwt;

  // const foundUser = userDB.users.find((user) => {
  //   return user.refreshToken === refreshToken;
  // });

  const foundUser = await User.findOne({ refreshToken });
  console.log({ foundUser });
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    return res.sendStatus(204);
  }

  // Delete the refreshToken in the DB
  // const resul = await User.updateOne(
  //   { refreshToken },
  //   { refreshToken: "" }
  // ).exec();
  // console.log({ resul });
  foundUser.refreshToken = "";
  const delResult = await foundUser.save();
  console.log({ delResult });
  res.clearCookie("jwt", {
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  }); // secure: true - only server on production (in production).
  res.sendStatus(204);
};

module.exports = handleLogout;
