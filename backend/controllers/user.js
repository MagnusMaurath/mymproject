const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { sequelize } = require("../modernDBConnection");
const db = require("../models");

const Entry = db.entries;
const Category = db.categories;
const User = db.users;

exports.userLogin = (req, res, next) => {
  let foundUser; // Deklarieren Sie die 'user'-Variable außerhalb der `.then`-Callbacks

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      foundUser = user; // Speichern Sie das gefundene Benutzerobjekt in der 'foundUser'-Variable
      console.log(req.body.email);
      console.log(user.password);
      const modifiedHash = user.password.replace("$2y$", "$2a$");
      return bcrypt.compare(req.body.password, modifiedHash);
    })
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "auth failed",
        });
      }
      const token = jwt.sign(
        {
          email: foundUser.email, // Verwenden Sie 'foundUser' anstelle von 'user'
          userId: foundUser.id, // Verwenden Sie 'foundUser' anstelle von 'user'
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: foundUser.id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "auth failed",
      });
    });
};
