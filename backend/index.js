const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const users = require('./router/user.router')
const card = require('./router/card.router')
const project = require('./router/project.router')
const history = require('./router/history.router')
const { generateToken, verifyToken }  = require('./auth.js')

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/users", users);
app.use("/cards" ,card)
app.use("/projects", project)
app.use("/history" , history)
app.get('/protected', verifyToken, (req, res) => {
    // ถ้า Token JWT ถูกต้องและผู้ใช้เข้าสู่ระบบแล้ว
    res.json({ status: true, user: req.user });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
