import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) return res.status(400).json({ success: false, message: `Fill the missing fields` });

   try {
      const userExisted = await User.findOne({ email });

      if (userExisted) return res.status(409).json({ success: false, message: `User already existed with this email` });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });

      const savedUser = await newUser.save();

      if (!savedUser) return res.status(500).json({ success: false, message: `Internal server error` });

      

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, { 
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({ success: true, message: `User created with ${email}` });

   } catch (error) {
      res.status(500).json({ success: false, message: error });
   }
}

export const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email && !password) return res.status(400).json({ success: false, message: `Fill the missing fields` });

   try {
      const userExisted = await User.findOne({ email });

      if (!userExisted) return res.status(400).json({ success: false, message: `User not existed with this email` });

      const comparingPassword = await bcrypt.compare(password, userExisted.password);

      if (!comparingPassword) return res.status(400).json({ success: false, message: `Wrong password` });

      const token = jwt.sign({ id: userExisted._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, { 
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({ success: true, message: `User loggined with ${email}` });

   } catch (error) {
      res.status(500).json({ success: false, message: error });
   }
}

export const logout = async (req, res) => {
   res.clearCookie('token',  { 
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
      });

   res.status(200).json({ success: true, message: `User Logged out` });
}