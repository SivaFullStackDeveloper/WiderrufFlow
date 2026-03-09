const express = require('express');
const path = require('path');
const app = express();

// This line tells Express that everything inside src/public is accessible
// It will automatically look for 'index.html' inside that folder.
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.json());

// You don't even need a specific app.get('/') if index.html is in src/public, 
// but this is the "safe" way to write it:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.post('/v1/revoke', (req, res) => {
    res.json({ success: true, message: "Request received" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});