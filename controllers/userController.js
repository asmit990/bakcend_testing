const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const User = require('../models/userModel'); // ✅ Capitalized
const jwt = require('jsonwebtoken')
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {

    res.status(400);
    throw new Error("Invalid user data");
  }
  console.log(`User is created ${user}`)
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password) {
    res.status(400);
    throw new Error("all field are mandatory")
    }
    const user = await User.findOne({email})
if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        user: {
            username: user.username, 
            email: user.email,
            id: user.id,
        },
    }, process.env.ACCESS_TOKEN_SECRET);
    {expiresIn: "1m"}
res.status(200).json({ accessToken })
}
else {
    res.status(401)
    throw new Error("email or password ")
}
  res.json({ message: "login the user" });
});




module.exports = { registerUser, loginUser };
