import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Bu email kullanılmaktadır!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifreniz 6 karakterden küçük olmamalıdır!" });
    }

    const passwordHashed = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({ username, email, password: passwordHashed });

    const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({ status: "OK", newUser, userToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı!" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "Şifre yanlış!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: "OK", user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
