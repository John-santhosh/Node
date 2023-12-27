const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    res.status(400).json({ message: "user name and pwd required" });
  }

  //check for duplicate username in DB
  // { userName (from Db): user(from register api) } check id a userName from db is matches with user from /register
  // use of .exec() => https://chat.openai.com/share/12fea071-603c-4cfa-b68d-871123c887ae
  const existing = await User.findOne({ userName: user }).exec();
  console.log({ existing });
  if (existing) return res.sendStatus(409); // conflict
  // const
  try {
    // encrypt password.
    const secretPasswd = await bcrypt.hash(pwd, 10);

    // store the new user
    const result = await User.create({
      userName: user,
      password: secretPasswd,
      // roles: { User: 2001 }, // will be created by schema.
      // id: // will get automatically by DB
    });

    //There is also a another way to do this (work around).
    // const newUser = new User({
    //   userName: user,
    //   password: secretPasswd,
    // });
    // const res = await newUser.save()

    console.log({ result });

    res.status(201).json({ message: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
