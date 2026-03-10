const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({

fullName: {
type: String,
required: true
},

email: {
type: String,
required: true
},

company: {
type: String,
required: true
},

privacyAccepted: {
type: Boolean,
required: true
},

termsAccepted: {
type: Boolean,
required: true
},

createdAt: {
type: Date,
default: Date.now
}

});

module.exports = mongoose.model("DemoRequest", demoSchema);