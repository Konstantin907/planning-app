import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            res.status(401).json({ message: 'All fields must be provided!' })
        }
        const userExists = await User.findOne({ email });
        if (userExists)
          return res
            .status(400)
            .json({ message: "Email is registered already!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // new user
        const user = await User.create({
            name, email, password: hashedPassword
        });
        // jwt
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
          token,
          user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.log('Error occured', error);
        res.status(404).json({ message: 'Server error occured during register!' })
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(401).json({ message: "Server error during login" });
  }
};

// user Search:
export const findUser = async(req, res) => {
  try {
    const { email } = req.query;
    const user = await User.find({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });

  } catch (error) {
        res.status(401).json({ message: "Server error finding user" });
  }
}