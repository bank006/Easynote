let project =([
    {id:1 ,  title: 'dev' ,description:'teamdev' ,colorthem: '#DB9999',iduser:2 },
    {id:2 ,  title: 'dev' ,description:'teamdev' ,colorthem: '#DB9999',iduser:3 },
    {id:3 ,  title: 'dev2',description:'teammaket',colorthem:'#750000' , iduser:4 }
])

function  Getproject() {
    return project;
}

function getprojectbyuser(iduser) {
    return project.filter(p => p.iduser === iduser);
}

function addproject (newProject){
    project.push( newProject );
}


module.exports = {
    Getproject,
    getprojectbyuser ,
    addproject
};