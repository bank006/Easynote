<script>
import axios from 'axios';
import { ref } from 'vue';
import { watch } from 'vue';

export default {
    setup() {
        const items = ref([])
        const itemuser = ref([])
        const token = localStorage.getItem('token')

        const config = {
            headers: {
                Authorization: token,
            },
        };
        watch(() => {
            axios.get('http://localhost:3000/protected', config).then((res) => {
                getuser(res.data.user.id)
                getproject(res.data.user.id)
            }).catch((err) => {
                console.log(err)
            })
        })

        const getuser = (id) => {
            axios.get(`http://localhost:3000/users/getuserbyid/${id}`).then((res) => {
                itemuser.value = res.data
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        const getproject = (idusers) => {
            console.log(idusers)
            axios.get(`http://localhost:3000/projects/getproject/${idusers}`, config)
                .then((result) => {
                    items.value = result.data
                    console.log(result.data)
                }).catch((err) => {
                    console.log(err);
                })
        }

        console.log(itemuser.value)

        return {

            items,
            itemuser
        }
    }
}



</script>
<template>
    <div class="container-topbar">
        <div class="item-topbar">
            <div class="select-project">
                <h1>Easy Note</h1>
            </div>
            <div style="color: black;" v-for="item in itemuser" class="profile">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<style>
.container-topbar {
    display: flex;
    align-items: center;
    height: 100%;
    box-shadow: 0 0 5px black;
    background-color: rgb(255, 255, 255);
}

.item-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 90%;
}

.profile {
    padding-right: 30px;
}

.select-project{
    margin-left: 20px;
}
</style>
