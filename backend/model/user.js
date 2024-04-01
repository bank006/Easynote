let user = ([
    {
    iduser: 1, name: 'bank', email: 'bank@gmail.com', password: '123'

},{iduser:2 , name :'bank2' , email:'bank2@gmail.com' , password:'1234'}
])

// ฟังก์ชั่นเพื่อดึงข้อมูลผู้ใช้ทั้งหมด
function getAllUsers() {
    return user;
}

function AddUsers(newUser) {
    user.push(newUser)
}

function getuserbyid(id) {
    return user.filter(u => u.iduser === id)
}

function findUserByEmailAndPassword(email, password) {
    return user.find(u => u.email === email && u.password === password);
}

module.exports = {
    getAllUsers,
    AddUsers,
    findUserByEmailAndPassword,
    getuserbyid
};