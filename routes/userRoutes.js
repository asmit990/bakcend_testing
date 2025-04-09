const express = require("express")
const { registerUser, loginUser } = require("../controllers/userController")
const validateToken = require("../validateTokenHandler")

const router = express.Router()

router.post("/register", registerUser)


router.post("/login", loginUser )

router.post("/current", validateToken)


module.exports = router;
