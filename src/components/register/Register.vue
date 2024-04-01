<script>
import axios from 'axios';
import { ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        function generateRandomId() {
            const characters = '0123456789';
            const length = 10; // กำหนดความยาวของไอดีที่ต้องการสร้าง

            let randomId = '';
            for (let i = 0; i < length; i++) {
                randomId += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return randomId;
        }

        const randomId = generateRandomId();

        const countuser = ref([])
        const username = ref([])
        const emails = ref([])
        const passwords = ref([])

        const handlesetusername = (e) => {
            username.value = e.target.value
        }
        const handlesetemail = (e) => {
            emails.value = e.target.value
        }
        const handlesetpassword = (e) => {
            passwords.value = e.target.value
        }
        watch(() => {
            axios.get('http://localhost:3000/users').then((res) => {
                const id = res.data
                countuser.value = id
            }).catch((err) => {
                console.log(err)
            })
        })

        const adduser = () => {
            const iduser = parseInt(randomId)
            const name = username.value
            const email = emails.value
            const password = passwords.value
            console.log(iduser, name, email, password)
            axios.post('http://localhost:3000/users/Adduser', { iduser, name, email, password }).then((result) => {
                router.push({name:"Login"})
            }).catch((err) => {
                console.log(err)
            })
        }



        return {
            adduser,
            handlesetemail,
            handlesetpassword,
            handlesetusername
        }
    }
}


</script>
<template>
    <div class="container-register">
        <div class="content-register">
            <div class="item-register">
                <p>สมัครสมาชิก</p>
                <div class="item-input">
                    <label for="idusername">Username</label>
                    <div class="box-input">
                        <input @change="handlesetusername" type="text" id="username">
                    </div>
                </div>
                <div class="item-input">
                    <label>Email</label>
                    <div class="box-input">
                        <input @change="handlesetemail" type="email">
                    </div>
                </div>
                <div class="item-input">
                    <label>Password</label>
                    <div class="box-input">
                        <input @change="handlesetpassword" type="password">
                    </div>
                </div>

                <div class="btn-register">
                    <button @click="adduser">สมัครสมาชิก</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.container-register {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-register {
    width: 300px;
    height: 300px;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 5px black;
}

.item-register {
    margin: 10px;
}

.item-register p {
    margin-bottom: 10px;
    font-size: 23px;
    text-align: center;
}

.item-input {
    width: 250px;
    height: 40px;
    margin-bottom: 15px;
    border-radius: 14px;
}

.box-input {
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 23px;
    margin-bottom: 20px;
    border: 1px solid black;
}

.box-input input {
    margin-left: 10px;
    width: 90%;
    height: 90%;
    border: none;
    background: none;
    outline: none;
}

.btn-register {
    margin-top: 50px;
    text-align: center;
    height: 40px;
}

.btn-register button {
    height: 100%;
    width: 100px;
    border: none;
    background: none;
    border-radius: 13px;
    background-color: rgb(136, 205, 251);
}

.btn-register button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 1px black;
}
</style>