const express = require("express");
const router = express.Router();

const DemoRequest = require("../models/demo_model");

router.post("/", async (req, res) => {

try {

const {
fullName,
email,
company,
privacyAccepted,
termsAccepted
} = req.body;

if (!privacyAccepted || !termsAccepted) {

return res.status(400).json({
message: "Datenschutz und AGB müssen akzeptiert werden"
});

}

const demo = new DemoRequest({

fullName,
email,
company,
privacyAccepted,
termsAccepted

});

await demo.save();

res.json({

message: "Demo erfolgreich angefordert"

});

} catch (error) {

res.status(500).json({
message: "Serverfehler"
});

}

});

module.exports = router;