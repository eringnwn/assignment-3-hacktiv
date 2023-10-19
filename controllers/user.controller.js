const { Photo, User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

exports.getAllUser = async (req, res) => {
  await User.findAll({
    include: Photo,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json(e);
    })
}

exports.registerUser = async (req, res) => {
  const body = req.body;
  const username = body.username;
  const email = body.email;
  const password = body.password;

  await User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).send({
          name: "Register User Error",
          message: "Email already exists",
        });
      } else {
        User.create({
          username: username,
          email: email,
          password: password,
        })
          .then((user) => {
            res.status(201).json({
              user: {
                id: user.id,
                email: user.email,
                username: user.username,
              },
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(500).json(e);
          });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: "User Registration Failed",
      });
    });
};

exports.loginUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  await User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          name: "User Login Error",
          message: `Cannot find user with email "${email}"`,
        });
      }

      const isCorrect = comparePassword(password, user.password);

      if (!isCorrect) {
        return res.status(401).json({
          name: "User Login Error",
          message: `Incorrect Password!`,
        });
      }
      let payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      const token = generateToken(payload);
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};