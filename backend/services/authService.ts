import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User from "../models/userModals";
import { RegisterRequest, LoginRequest, IUser } from "../types";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterRequest): Promise<Pick<IUser, "_id" | "name" | "email">> => {
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      throw new ApiError(400, "Email already exists");
    }

    const hashedpassword: string = await bcrypt.hash(password, 10);

    const newUser: any = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    const { password: storedPassword, ...userWithoutPassword } =
      newUser.toObject();
    return userWithoutPassword as Pick<IUser, "_id" | "name" | "email">;
  } catch (error) {
    throw new ApiError(
      500,
      (error as Error).message || "Internal server error",
    );
  }
};

export const logoutUser = async (
  token: string,
): Promise<{ message: string }> => {
  try {
    // blacklistedTokens.add(token);
    return { message: "Logged out successfully" };
  } catch (error) {
    throw new ApiError(500, (error as Error).message || "Logout failed");
  }
};

export const loginUser = async ({ email, password }: LoginRequest) => {
  try {
    const exist = await User.findOne({ email });

    if (!exist) {
      throw new ApiError(401, "Email Not found");
    }
    const passwordmatch = await bcrypt.compare(
      password,
      exist.password as string,
    );
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
        _id: exist._id,
        name: exist.name,
        email: exist.email,
      },
    };
  } catch (error) {
    throw new ApiError(
      500,
      (error as Error).message || "Internal server error",
    );
  }
};
