const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const authService = require("../services/authService");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const newUser = await authService.registerUser({ name, email, password });

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const { token, user } = await authService.loginUser({ email, password });

  res.status(200).json({
    message: "User login success",
    token,
    user,
  });
});
