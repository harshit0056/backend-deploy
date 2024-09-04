const router = require("express").Router();
const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //LOGIN
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        $or: [
          { email: req.body.email },
        ]
      });
  
      if (!user) {
        return res.status(401).json("Wrong email or username");
      }
  
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const inputPassword = req.body.password;
  
      if (originalPassword !== inputPassword) {
        return res.status(401).json("Wrong Password");
      }
  
      res.status(200).json({ message: "Success!!", name: user.name ,email:user.email});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;