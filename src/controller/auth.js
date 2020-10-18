const { User } = require("../../models");

//define the jwt
const jwt = require("jsonwebtoken");

//define the encryption
const bcrypt = require("bcrypt");

//import validator
const joi = require("@hapi/joi");

//import jwt_key from .env
const jwtKey = process.env.JWT_KEY;

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.register = async (req, res) => {
  try {
    //define the body request
    const { email, password, fullName, gender, phone, address } = req.body;

    //---------------Start Validation--------------//
    const schema = joi.object({
      email: joi.string().min(10).required(),
      password: joi.string().min(8).required(),
      fullName: joi.string().min(3).required(),
      gender: joi.string().required(),
      phone: joi.number().required(),
      address: joi.string().required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error from validation then show message error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //---------------End Validation--------------//

    //check if email already input
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    //get message when email already registered
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already registered to this server",
        },
      });
    }

    //make password secure with bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      email,
      password: hashPassword,
      fullName,
      gender,
      phone,
      address,
    });

    //if register success then make token from jwt
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      jwtKey
    );

    //display result from request register response
    res.send({
      message: "Congratulations, your account has been successfully created",
      data: {
        role: user.role,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    //get email and password from request body
    const { email, password } = req.body;

    //---------------Start Validation--------------//
    const schema = joi.object({
      email: joi.string().min(10).required(),
      password: joi.string().min(8).required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error from validation then show message error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //---------------End Validation--------------//

    //check user in database based on email inputed
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //check if user existed with email inputed
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or password invalid",
        },
      });
    }

    //if user existed, check are the password same with compare input with database
    const validityPassword = await bcrypt.compare(password, user.password);

    //if password not same when compared then
    if (!validityPassword) {
      return res.status(400).send({
        error: {
          message: "Email or password invalid",
        },
      });
    }

    //if email and password match or valid then create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      jwtKey
    );

    //send response from login system
    res.send({
      message: "You has been successfully loged in!",
      data: {
        role: user.role,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};
