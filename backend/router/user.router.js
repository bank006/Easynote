const express = require('express')
const cors = require('cors');
const router = express.Router();;

router.use(cors());
router.use(express.json());

let user = require('../model/user')
const { generateToken, verifyToken }  = require('../auth.js');
const { param } = require('./project.router.js');

// GET route to fetch user data
router.get('/', (req, res) => {
    try {
        // ดึงข้อมูลผู้ใช้จากโมเดล
        const users = user.getAllUsers();
        // ส่งข้อมูลผู้ใช้กลับในรูปแบบ JSON
        res.status(200).json(users);
    } catch (error) {
        // หากเกิดข้อผิดพลาดในการดึงข้อมูล
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// POST route เพื่อเพิ่มข้อมูลผู้ใช้ใหม่
router.post('/Adduser', (req, res) => {
    try {
        const newUser = req.body; // รับข้อมูลผู้ใช้ใหม่จาก request body
        user.AddUsers(newUser); // เรียกใช้งานฟังก์ชั่นในโมดูล user เพื่อเพิ่มข้อมูลผู้ใช้ใหม่
        res.status(201).send('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
});


router.get('/getuserbyid/:id',(req,res)=>{
    try{
        const id = parseInt(req.params.id)
        const youuser =  user.getuserbyid(id)
        res.status(200).json(youuser)
    }catch(error){
        console.error(error)
    }
})



// Login route
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        // ค้นหาผู้ใช้ด้วยอีเมลและรหัสผ่าน
        const foundUser = user.findUserByEmailAndPassword(email, password);
        
        // ถ้าไม่พบผู้ใช้หรือข้อมูลไม่ถูกต้อง
        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // สร้าง token
        const token = generateToken(foundUser);
        res.json({ foundUser, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;


