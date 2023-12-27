const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fspromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    res.status(400).json({ message: "user name and pwd required" });
  }

  //check for duplicate username in DB
  const existing = userDB.users.find((usr) => usr.userName === user);
  console.log({ exUsers: userDB.users });
  console.log({ existing });
  if (existing) return res.sendStatus(409); // conflict
  // const
  try {
    // encrypt password.
    const secretPasswd = await bcrypt.hash(pwd, 10);

    // store the new user
    const newUser = {
      userName: user,
      password: secretPasswd,
      roles: { User: 2001 },
    };

    userDB.setUsers([...userDB.users, newUser]);

    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
