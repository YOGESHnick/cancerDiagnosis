const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// R E G I S T E R 
router.post("/register", async (req, res) => {
  
  try {
    const { name, profileImage, email, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user 
    const newUser = new User({
      name,
      profileImage,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  }catch (error) {
    res.status(500).json(error);
  }
});

// L O G I N 
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json("Wrong password!");
    }

    const userToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    // localStorage.setItem('userToken',userToken); 
    // return res.status(200).json({ user, userToken });
    return res.status(200).json({ userToken, userId: user._id });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// GET USER
router.get("/user/:id", async(req,res)=>{
  const user = await User.findOne({ _id: req.params.id });
  const { username, password, ...userData } = user.toObject();
  return res.status(200).json(userData);
});

module.exports = router;
