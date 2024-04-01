const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(express.json());

const card = require('../model/card');
const user = require('../model/user');
const {  verifyToken }  = require('../auth.js')

router.get('/', (req, res) => {
    try {
        const cards = card.Getcard();
        res.status(200).json(cards);
    } catch (error) {
        console.log('Error fetching data', error);
        res.status(500).send("Server error");
    }
});

router.post("/addCards", (req, res) => {
    try{
        const newCard = req.body
        card.Addcard(newCard);
        res.status(201).send('Card added successfully')
    }catch (error){
        console.log('Error adding card' , error)
        res.status(500).send('Error adding card')
    }
})


router.get('/getuserwithcard', (req, res) => {
    try {
        const cards = card.Getcard();
        const usersWithCards = user.getAllUsers().filter(u => cards.some(c => c.iduser === u.iduser));
        res.status(200).json(usersWithCards);
    } catch (error) {
        console.log('Error fetching data', error);
        res.status(500).send("Server error");
    }
});

router.get('/getcardbyproject/:idproject' , (req ,res )=>{
    try{
        const idprojects = parseInt(req.params.idproject)
        const yourcard = card.getcardbyproject(idprojects)
        res.status(201).json(yourcard)
    }catch(error){
        console.log(error)
    }
})

router.put('/update/:id', (req,res)=>{
    // console.log(req.params.id)
    // console.log(req.body.list)
    try{
        const cardId = parseInt(req.params.id);
        const newList = req.body.list;
        card.updateList(cardId, newList);
        res.status(200).send('Card list updated successfully');
    } catch (error) {
        console.log('Error updating card list', error);
        res.status(500).send('Error updating card list');
    }
})

router.put('/updatecard/:id',(req , res)=>{
    try{
        const id = parseInt(req.params.id)
        const newtitle = req.body.newtitle
        const newdescription = req.body.newdescription
        const newiduser = req.body.newiduser
        card.updatecard(id , newtitle , newdescription , newiduser)
        res.status(200).send('Update your card success')
    }catch(error){
        console.log('error', error)
    }
})



router.delete('/deletecard/:id', (req, res) => {
    const id = parseInt(req.params.id); // รับค่า id ของการ์ดที่ต้องการลบจากพารามิเตอร์ของเส้นทาง
    try {
        card.deletecardById(id); // เรียกใช้ฟังก์ชันในโมดูล user เพื่อลบการ์ด
        res.status(200).send('Card deleted successfully'); // ส่งข้อความกลับไปยังไคลเอ็นต์เมื่อลบการ์ดสำเร็จ
    } catch (error) {
        res.status(500).send(`Error deleting card: ${error.message}`); // ส่งข้อความข้อผิดพลาดกลับไปยังไคลเอ็นต์หากเกิดข้อผิดพลาดขึ้น
    }
});


router.get('/callcard/:id',(req , res)=>{
    const id = parseInt(req.params.id)
    try{
        const cards =  card.callcardbyidcard(id)
        res.status(200).json(cards)

    }catch(error){
        res.status(500).send('error' , error)
    }
})



module.exports = router;


