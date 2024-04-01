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

function deleteproject (id){
    const indexToDelete = project.findIndex(item => item.id===id);
    if(indexToDelete === -1){
        throw new Error('Project not found');
    }
    project.splice(indexToDelete , 1)
}


module.exports = {
    Getproject,
    getprojectbyuser ,
    addproject,
    deleteproject
};