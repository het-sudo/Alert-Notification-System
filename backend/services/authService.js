const user = require("../models/userModals");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

exports.registerUser = async ({ name, email, password }) => {
  try {
    const exist = await user.findOne({ email });
    if (exist) {
      throw new ApiError(400, "Email already exists");
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedpassword,
    });

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const exist = await user.findOne({ email });

    if (!exist) {
      throw new ApiError(401, "Email Not found");
    }
    const passwordmatch = await bcrypt.compare(password, exist.password);
    if (!passwordmatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { userId: exist._id, email: exist.email },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: exist._id,
        name: exist.name,
        email: exist.email,
      },
    };
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
};
