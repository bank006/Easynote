const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(express.json());

const history = require('../model/historyupdate')

router.get('/', (req, res) => {
    try {
        const historys = history.Gethistory();
        res.status(200).json(historys);
    } catch (error) {
        console.log('Error fetching data', error);
        res.status(500).send("Server error");
    }
});


router.post('/addhistory' , (req ,res)=>{
    try{
        const newHistory = req.body
        history.addHistory(newHistory)
        res.send('History update Success')
    }catch (error){
        console.log('Error' , error)
    }
})


router.get('/gethistory/:id',(req , res)=>{
    try {
        const id = parseInt(req.params.id)
        const yourhistory = history.gethitorybyid(id)
        res.json(yourhistory)
    }catch(error){
        console.lo('error', error)
    }
})


module.exports = router;