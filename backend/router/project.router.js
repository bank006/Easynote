
const express = require('express');
const cors = require('cors');
const router = express();

router.use(cors());
router.use(express.json());
const {  verifyToken }  = require('../auth.js')

let project = require('../model/project')


router.get('/',(req, res) => {
    try {
        const projectuser = project.Getproject();
        res.status(200).json(projectuser);
    } catch (error) {
        console.log('Error fetching data', error);
        res.status(500).send("Server error");
    }
});


router.post("/addproject",verifyToken,(req,res)=>{
    try{
        const newProject = req.body

        project.addproject(newProject)
        res.status(201).send('Project added successfully')
    } catch(error){
        console.log('Error adding project')
        res.status(500).send('Error adding project', error)
    }
})

router.get('/getproject/:idusers', verifyToken  ,(req, res)=>{
    try{
        const iduser = parseInt(req.params.idusers)
        const yourproject =  project.getprojectbyuser(iduser)
        res.status(200).json( yourproject );
    }catch(error){
        console.log('Error :', error);
        res.status(500).send('error get your project')
    }
})

module.exports = router;