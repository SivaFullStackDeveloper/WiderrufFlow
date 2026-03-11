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
const cors = require("cors");
const checkerRouter = require("./src/routers/checker");

require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log("MongoDB verbunden"))
.catch(err => console.error("MongoDB Fehler:", err));

// Middleware
app.use(express.static(path.join(__dirname, "src", "public")));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Static files

app.use(express.static("public", { index: false }));

// Security: block access to sensitive files
app.use((req,res,next) => {
    const blocked = [
        ".env",
        ".git",
        "package.json",
        "package-lock.json",
        "config",
        "log",
        ".json"
    ];
    if(blocked.some(file => req.url.includes(file))){
        return res.status(403).send("Access denied");
    }
    next();
});

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

app.disable("x-powered-by");

// Routers
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/demo", demoRouter);

app.use("/api", checkerRouter);
// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// Example API endpoint
app.post('/v1/revoke', (req, res) => {
    res.json({ success: true, message: "Request received" });
});
// Example API endpoint
app.get('/v1/revoke', (req, res) => {
    res.json({ success: true, message: "Request received" });
});



// Your API endpoint
app.post("/api/withdraw", express.json(), (req, res) => {
  console.log(req.body); // orderId & userEmail
  res.json({ success: true });
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});