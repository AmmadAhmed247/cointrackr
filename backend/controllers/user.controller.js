import express from "express"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
export const registerUser=async(req,res)=>{
    try {
        console.log("Incoming request body:", req.body);
        const {username,email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User Already registered"})
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            username,email,password:hashedPassword,
        })
        const savedUser=await newUser.save();
        res.status(201).json({message:"User Created",user:savedUser})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in prod
      sameSite: "lax", // or 'none' if using different domains and HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
