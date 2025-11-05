import Snippet from "../models/SnippetModel.js";
import User from "../models/UserModel.js";
import generateToken from "../utility/generateToken.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { userName, emailID, password } = req.body;
  if (!userName?.trim() || !password?.trim() || !emailID?.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailID)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  if (password?.trim().length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 character long.",
    });
  }

  const existingEmailID = await User.findOne({ emailID });
  if (existingEmailID) {
    return res
      .status(409)
      .json({ success: false, message: "Email ID already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      emailID,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.userName,
        emailID: newUser.emailID,
      },
      token,
    });
  } catch (error) {
    console.log("Error occur in registerUser function: ", error);
  }
};

export const loginUser = async (req, res) => {
  const { emailID, password } = req.body;
  if (!emailID?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailID)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  if (password?.trim().length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const user = await User.findOne({ emailID });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email ID not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: "User login successfull",
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        emailID: user.emailID,
      },
    });
  } catch (error) {
    console.log("Error occur in loginUser: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error please try again later",
    });
  }
};

export const userSnippets = async (req, res) => {
  try {
    const userSnippets = await Snippet.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    if (!userSnippets || userSnippets.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No snippets found" });
    }
    return res.status(200).json({
      success: true,
      snippet: userSnippets,
    });
  } catch (error) {
    console.log("Error occur in userSnippets: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error please try again later" });
  }
};
