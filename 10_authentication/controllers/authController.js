const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).json({ message: "user name and pwd required" });
  }
  const foundUser = userDB.users.find((usr) => {
    return usr.userName === user;
  });

  if (!foundUser) res.sendStatus(401); // unauthorized

  if (bcrypt.compare(foundUser.password, pwd)) {
    // this is where we create JWT
    res.json({ success: `user ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
