const express = require('express');
const path = require('path');
const app = express();
const loginRouter = require("./src/routers/login_router");
const registerRouter = require("./src/routers/register_router");
const demoRouter = require("./src/routers/demo_router");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB verbunden"))
.catch(err => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use((req,res,next)=>{

if(req.url.match(/\.(env|log|config|json)$/i)){
return res.status(403).send("Forbidden");
}

next();

});



const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 100
});

app.use(limiter);
app.use(express.urlencoded({ extended: true }));
// This line tells Express that everything inside src/public is accessible
// It will automatically look for 'index.html' inside that folder.
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.static("public", {
index: false
}));

app.use((req, res, next) => {

const blocked = [
".env",
".git",
"package.json",
"package-lock.json"
];

if (blocked.some(file => req.url.includes(file))) {
return res.status(403).send("Access denied");
}

next();

});

app.disable("x-powered-by");
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/demo", demoRouter);

// You don't even need a specific app.get('/') if index.html is in src/public, 
// but this is the "safe" way to write it:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.post('/v1/revoke', (req, res) => {
    res.json({ success: true, message: "Request received" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});