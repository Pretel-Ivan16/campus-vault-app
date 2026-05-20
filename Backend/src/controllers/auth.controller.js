const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail
} = require ("../models/user.model");

const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  sendError,
  sendSuccess
} = require("../utils/error.helper");

const register = async (req, res) => {
  try {
    
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await createUser(
      username,
      email,
      hashedPassword
    );

    sendSuccess(res, HTTP_STATUS.CREATED, ERROR_MESSAGES.USER_CREATED_SUCCESS);

  } catch (error) {
    sendError(res, HTTP_STATUS.SERVER_ERROR, error.message);
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const users = await findUserByEmail(email);

    if (!users) {
      return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    };

    const validPassword = await bcrypt.compare(
      password,
      users.password
    );

    if (!validPassword){
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    };

    const token = jwt.sign(
      {
        id: users.id,
        email: users.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token
    });

  } catch (error) {
    sendError(res, HTTP_STATUS.SERVER_ERROR, error.message);
  } 
};

module.exports = {
  register,
  login
};