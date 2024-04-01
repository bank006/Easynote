<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref } from 'vue';


const emails = ref([])
const passwords = ref([])

const handleemail = (e) => {
    emails.value = e.target.value
}

const handlepassword = (e) => {
    passwords.value = e.target.value
}

const errormes = ref('')
const login = () => {
    const email = emails.value
    const password = passwords.value
    axios.post('http://localhost:3000/users/login', { email, password })
        .then((res) => {
            const newIdUser = res.data.foundUser.iduser
            const token = res.data.token
            localStorage.setItem('token', token);
            router.push({ name: 'Project', params: { iduser: newIdUser } });
        }).catch((err) => {
            errormes.value = 'some thing went wrong'
            console.log(err)

        })

}


const show = () => {
    const token = localStorage.getItem('token');
    console.log(token)
}

const register =()=>{
    router.push({name:"Register"})
}

</script>
<template>
    <div class="container-login">
        <div class="all-container-login">
            <div class="center-box">
                <div class="title-login">
                    <p>Login</p>
                </div>
                <div style="margin: 5px; color: red;">
                    <p>{{ errormes }}</p>
                </div>
                <div class="item-input-login">
                    <div class="input">
                        <input type="text" @change="handleemail" placeholder="email">
                    </div>
                    <div class="input">
                        <input type="password" @change="handlepassword" placeholder="password">
                    </div>
                </div>
                <div class="btn-login">
                    <button @click="login">login</button>
                </div>
                <div class="none-member">
                    <button @click="register">register</button>
                </div>

                <!-- <button @click="show">show</button> -->
            </div>
        </div>
    </div>
</template>

<style>
.container-login {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.all-container-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 300px;
    background-color: white;
    border-radius: 13px;
    box-shadow: 0 0 5px black;

}
.title-login{
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: center;
}
.center-box{
    height: 70%;

}

.item-input-login{
    width: 100%;
    height: 60%;
}

.input{
    border: 1px solid black;
    margin-bottom: 15px;
    height: 30px;
    border-radius: 12px;
}

.input input{
    width: 90%;
    height: 90%;
    border: none;
    background: none;
    outline: none;
    margin-left: 10px
}

.btn-login{
    display: flex;
    justify-content: center;
    height: 30px;
}

.btn-login button{
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    border-radius: 13px;
    background-color: rgb(136, 205, 251);
    transition: 1.1ms ease-in-out;
    cursor: pointer;
}

.btn-login button:hover{
    transform: scale(1.1);
}
.none-member{
    margin-top: 10px;
    text-align: end;
}

.none-member button{
    color: rgb(241, 114, 114);
    font-size: 14px;
    border: none;
    background: none;
    cursor: pointer;

}
</style>