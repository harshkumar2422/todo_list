import { User } from "../models/usermodes.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/featured.js";
import ErrorHandler from "../middlewares/error.js";
// import jwt from "jsonwebtoken";

export const register = async (req, res) => {
 
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        success:false,
        message:'User already exist'
      })
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedpassword });
    sendCookie(user, res, "registered successfully", 201);
  
};

export const getallUser = async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("user doesn't exist", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invali email or password", 400));

    sendCookie(user, res, `welcome Back,${user.name}`,201);
  } catch (error) {
    next(error);
  }
};

export const getmyprofile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite:"none",
      secure:true,
    })
    .json({
      success: true,
      message: "logout successfully",
    });
};
