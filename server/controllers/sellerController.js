import jwt from "jsonwebtoken";
import { cookieOptionsWithAge, cookieOptions } from "../configs/cookieConfig.js";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, cookieOptionsWithAge());

      return res.json({
        success: true,
        message: "Logged In",
      });
    }

    return res.json({
      success: false,
      message: "Invalid Credentials",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "error.message",
    });
  }
};

export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", cookieOptions);

    return res.json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: "error.message",
    });
  }
};
