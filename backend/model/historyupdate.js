let history = ([]);

function Gethistory(){
    return history
}

function addHistory(newHistory){
    history.push(newHistory)
}

function gethitorybyid(id){
    return history.filter(h=>h.id === id)
}

module.exports = {
    Gethistory,
    addHistory,
    gethitorybyid
}