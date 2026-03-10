const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/user_model");

router.post("/", async (req, res) => {

try {

const {
name,
email,
password,
company,
shop,
termsAccepted,
privacyAccepted
} = req.body;

if (!termsAccepted || !privacyAccepted) {
return res.status(400).json({
message: "AGB und Datenschutz müssen akzeptiert werden"
});
}

const existingUser = await User.findOne({ email });

if (existingUser) {
return res.status(400).json({
message: "E-Mail existiert bereits"
});
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({

name,
email,
password: hashedPassword,
company,
shop,
termsAccepted,
privacyAccepted

});

await user.save();

res.json({
message: "Registrierung erfolgreich"
});

} catch (error) {

res.status(500).json({
message: "Serverfehler"
});

}

});

module.exports = router;