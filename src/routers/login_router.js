const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user_model");

router.post("/", async (req, res) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({
message: "Benutzer nicht gefunden"
});
}

const validPassword = await bcrypt.compare(password, user.password);

if (!validPassword) {
return res.status(400).json({
message: "Falsches Passwort"
});
}

const token = jwt.sign(
{ userId: user._id },
process.env.JWT_SECRET,
{ expiresIn: "1d" }
);

res.cookie("token", token, {
httpOnly: true
});

res.json({
message: "Login erfolgreich"
});

} catch (error) {

res.status(500).json({
message: "Serverfehler"
});

}

});

module.exports = router;