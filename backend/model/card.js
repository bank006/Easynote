let cards = ([]);

function Getcard() {
    return cards;
}

function Addcard(newCard) {
    cards.push(newCard);
}

function updateList(cardId, newList) {
    const index = cards.findIndex(card => card.id === cardId);
    if (index !== -1) {
        cards[index].list = newList;
    }
}

function updatecard(id , newtitle , newdescription , newiduser){
    const index = cards.findIndex(c => c.id === id);
    if(index !== -1){
        cards[index].title = newtitle;
        cards[index].descriptioncards = newdescription;
        cards[index].iduser = newiduser
    }
}

function getcardbyproject (idproject){
    return cards.filter(c => c.idproject === idproject)
}

function callcardbyidcard (id){
    return cards.filter(c=>c.id === id)
}

function deletecardById(id) {
    // ค้นหา index ของการ์ดที่ต้องการลบ
    const indexToDelete = cards.findIndex(card => card.id === id);
    // ถ้าไม่พบการ์ดที่ต้องการลบในอาร์เรย์
    if (indexToDelete === -1) {
        throw new Error('Card not found');
    }
    // ลบการ์ดที่มี index ตามที่ค้นหาได้
    cards.splice(indexToDelete, 1);
}


module.exports = {
    Getcard,
    Addcard,
    updateList,
    getcardbyproject,
    getcardbyproject,
    deletecardById,
    callcardbyidcard,
    updatecard
};
