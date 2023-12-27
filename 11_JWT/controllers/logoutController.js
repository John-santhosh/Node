const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fspromises = require("fs").promises;

const path = require("path");

const handleLogout = async (req, res) => {
  // $$$$ on Client/FE, also delete the access

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // success but no content
  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find((user) => {
    return user.accessToken === refreshToken;
  });

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Delete the refreshToken in the DB
  const otherUser = userDB.users.filter(
    (user) => user.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUser, currentUser]);
  await fspromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  }); // secure: true - only server on production (in production).
  res.send(204);
};

module.exports = handleLogout;
