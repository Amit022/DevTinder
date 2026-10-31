const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation")
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateSignUpData(req);
    //Encrypt the password
    const { password, firstName, lastName, age, gender, emailId, photoUrl } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      emailId,
      password: passwordHash,
      photoUrl
    });
    await user.save();
    res.send("User Saved Successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user!!" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // validate the data
    if (!validator.isEmail(emailId)) {
      throw new Error("Please Enter Correct EmailId");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (isPasswordValid) {
      // Generate the JWT token
      const token = await jwt.sign({ _id: user._id }, "DEVTINDER@5386", {
        expiresIn: "1d",
      });
      //add inside cookie and send back to user
      res.cookie("token", token);
      res.send(user);
    } else {
      res.send("Invalid Credentials !!"); 
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req,res) => {
   res.cookie("token", null , {
    expires: new Date(Date.now())
   })
   res.send("Logout Successfully !!")
})

module.exports = authRouter; 
   