const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name: {
type: String,
required: true
},

email: {
type: String,
required: true,
unique: true
},

password: {
type: String,
required: true
},

company: {
type: String
},

shop: {
type: String
},

termsAccepted: {
type: Boolean,
required: true
},

privacyAccepted: {
type: Boolean,
required: true
},

createdAt: {
type: Date,
default: Date.now
}

});

module.exports = mongoose.model("User", userSchema);