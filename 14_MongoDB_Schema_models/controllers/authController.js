const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fspromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).json({ message: "user name and pwd required" });
  }
  const foundUser = userDB.users.find((usr) => {
    return usr.userName === user;
  });

  // evaluate password.
  if (!foundUser) res.sendStatus(401); // unauthorized

  const match = bcrypt.compare(foundUser.password, pwd);
  if (match) {
    const roles = Object.values(foundUser.roles);

    // this is where we create JWT
    // it will require a payload and we are gonna pass the username object not the password to avoid potential risk.
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.userName,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      // in production the expire time will be a small window of time maybe 5mins or 15 mins
      { expiresIn: "120s" } // options
    );

    // it will last longer than the accessToken
    const refreshToken = jwt.sign(
      { username: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } // options
    );

    // saving refreshToken with current user
    const otherUsers = userDB.users.filter((usr) => usr.userName !== user);
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    // the cookie we sent from our server cant be accessed by js in client and will be sent back on every request and we don't have to send like access token like we did to access token.
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None", // check in browser headers> set-cookies without this // won't work if secure and samesite are uncommented while using in thunderclient.
      maxAge: 24 * 60 * 60 * 1000, //IN ms(milliseconds) - this is equal to one day
    });
    res.json({ accessToken, name: foundUser.userName });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
