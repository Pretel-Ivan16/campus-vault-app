const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail
} = require ("../models/user.model");

const register = async (req, res) => {
  try {
    
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await createUser(
      username,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: "User created succesfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const users = await findUserByEmail(email);

    if (!users) {
      return res.status(404).json({
        message: "User not found"
      });
    };

    const validPassword = await bcrypt.compare(
      password,
      users.password
    );

    if (!validPassword){
      return res.status(401).json({
        message: "Invalid credentials"
      })
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
    res.status(500).json({
      message: error.message
    });
  } 
};

module.exports = {
  register,
  login
};