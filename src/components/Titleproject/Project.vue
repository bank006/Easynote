<script>
import axios from 'axios';
import { ref } from 'vue';
import { watch } from 'vue';
import VModal from 'vue-js-modal';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        // settoken
        const showModal = ref(false);
        const yourToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: yourToken,
            },
        };

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


        // cardproject
        const iduser = ref([])
        const project = ref([])
        const route = useRoute();
        const router = useRouter();
        const idUser = route.params.iduser;

        const idproject = ref([])

        watch(() => {
            axios.get('http://localhost:3000/projects').then((res) => {
                const id = res.data
                idproject.value = id
            }).catch((err) => {
                console.log(err)
            })
        })

        console.log(config.headers.Authorization)

        watch(() => {
            if (config.headers.Authorization === null) {
                router.push({ name: 'Login' });
            } else {
                iduser.value = [idUser]
                const idusers = iduser.value
                axios.get(`http://localhost:3000/projects/getproject/${idusers}`, config)
                    .then((result) => {
                        project.value = result.data

                        console.log(result.data)
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        })


        //add card
        const titleAddProject = ref("");
        const descriptionAddProject = ref("");
        const colorthemaddProject = ref("");
        const iduseraddProject = ref([]);


        const addproject = () => {
            const id = parseInt(randomId)
            const title = titleAddProject.value
            const description = descriptionAddProject.value
            const colorthem = colorthemaddProject.value
            const iduser = parseInt(idUser)
            console.log(id, title, description, colorthem, iduser)
            axios.post('http://localhost:3000/projects/addproject', { id, title, description, colorthem, iduser }, config)
                .then((res) => {
                    window.location.reload()
                }).catch((err) => {
                    console.log(err)
                })
        }


        // modal setup
        const openmodal = () => {
            showModal.value = true
        }

        const closemodal = () => {
            showModal.value = false
        }

        function hideLabel() {
            const label = document.getElementById('descriptionLabel');
            label.style.display = 'none';
        }
        function hideLabel2() {
            const label = document.getElementById('descriptionLabel2');
            label.style.display = 'none';
        }

        // go card
        const getlistcard = (idproject) => {
            console.log(idproject)
            router.push({ name: "Home", params: { idproject: idproject } })
        }

        //deletrproject

        const deleteproject=(id)=>{
            console.log(id)
            axios.delete(`http://localhost:3000/projects/deleteproject/${id}`)
            .then((res)=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
        }

        return {
            idUser,
            project,
            openmodal,
            closemodal,
            showModal,
            hideLabel,
            hideLabel2,
            getlistcard,
            addproject,
            titleAddProject,
            descriptionAddProject,
            colorthemaddProject,
            iduseraddProject,
            deleteproject
        };
    }
};

</script>
<template>
    <div class="container-project">
        <div class="allcontainer-project">
            <div class="topcard-project" v-if="project.length > 0">
                <div class="item-card-project" v-for=" item in project " :key="item.id">
                    <div class="all-incard">
                        <div :style="{ color: item.colorthem, backgroundColor: item.colorthem }" class="color">
                            <div style="display: flex; align-items: center; justify-content: end; padding-right: 20px;height: 100%;">
                                <img @click="deleteproject(item.id)"  width="20" height="20" src="/delete.svg" alt="">
                            </div>
                        </div>
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.description }}</p>
                        <div class="detailcard">
                            <div class="item-datailcard">
                                <button @click="getlistcard(item.id)">เข้า</button>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
            <div v-else>
                <h1>เริ่มสร้างทีม</h1>
                <img width="100" height="150" src="/add.svg" @click="openmodal" alt="">
            </div>
            <div class="add-project" v-if="project.length > 0">
                <div class="btn-addject" v-if="showModal === false">
                    <button @click="openmodal">open</button>
                </div>
                <!-- <div v-else>
                    <button @click="closemodal">close</button>
                </div> -->
            </div>
            <modal name="my-modal" v-if="showModal" @close="showModal = false">
                <div class="modal-project">
                    <div class="all-modal-addproject">
                        <div class="item-addproject">
                            <div class="project-close-modal">
                                <div class="img-close">
                                    <img @click="closemodal" src="/close.svg" alt="">
                                </div>
                            </div>
                            <div class="project-value-modal">
                                <h1>มาสร้างทีมกันน...</h1>
                                <div class="project-input">
                                    <label for="title" id="descriptionLabel">Title</label>
                                    <input type="text" id="title" @click=" hideLabel()"
                                        @change="titleAddProject = $event.target.value">
                                </div>
                                <div class="project-input">
                                    <label for="des" id="descriptionLabel2">Description</label>
                                    <input type="text" id="des" @click="hideLabel2()"
                                        @change="descriptionAddProject = $event.target.value">
                                </div>
                                <div class="project-input-color">
                                    <label for="des">Color Them</label>
                                    <input type="color" id="colorPicker" value="#FFFFFF"
                                        @change="colorthemaddProject = $event.target.value">
                                </div>
                            </div>

                            <div class="project-sunmit-modal">
                                <div class="btn-submit-project">
                                    <button @click="addproject">Submit</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </modal>

        </div>


    </div>

</template>
<style>
.container-project {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.allcontainer-project {
    width: 90%;
    height: 90%;
}

.topcard-project {
    display: flex;
    height: 80%;
    widows: 100%;
    padding: 15px
}

.item-card-project {
    width: 240px;
    height: 200px;
    margin: 15px;
    border-radius: 23px;
    box-shadow: 0 0 5px black;
    transition: transform 0.3s ease;
}

.item-card-project:hover {
    /* box-shadow: 0 0 5px black; */
    transform: scale(1.1);
}

.color {
    height: 25%;
    border-top-left-radius: 23px;
    border-top-right-radius: 23px;
    margin-bottom: 20px;
}

.all-incard {
    text-align: center;
    height: 100%;
    width: 100%;
}

.detailcard {
    display: flex;
    justify-content: center;
    margin-top: 12px;
    height: 30px;
}

.item-datailcard {
    width: 40%;
    height: 100%;
    border-radius: 23px;
    background-color: rgb(136, 205, 251);
}

.item-datailcard button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
}

/* add-project */
.add-project {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: end;
    /* border: 1px solid black; */
}

.btn-addject {
    width: 10%;
    height: 100%;
    background-color: rgb(136, 205, 251);
    border-radius: 18px;
}

.btn-addject button {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;
}

.btn-addject:hover {
    box-shadow: 0 0 5px black;
    transform: scale(1.1);
}

/* end add-project */

/* modal*/
.modal-project {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
}

.all-modal-addproject {
    width: 400px;
    height: 300px;
    display: flex;
    padding: 10px;
    border-radius: 23px;
    background-color: white;
    box-shadow: 0 0 5px black;
    justify-content: center;
}

.item-addproject {
    width: 100%;
    height: 100%;
    padding: 15px;
}



.project-close-modal {
    height: 6%;
    width: 100%;
    display: flex;
    justify-content: end;
}

.img-close {
    align-items: center;
    width: 10%;
    height: 100%;
}

.img-close img {
    cursor: pointer;
    width: 100%;
    height: 100%;
}

.project-value-modal {
    height: 70%;
    /* padding-top: 20px; */
}

.project-value-modal h1 {
    text-align: center;
    margin-bottom: 5px
}

.project-input {
    display: flex;
    align-items: center;
    border: 1px solid black;
    margin-bottom: 15px;
    height: 40px;
    color: white;
    border-radius: 23px;
    padding-left: 15px;
}

.project-input label {
    color: black;
}

.project-input input {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    width: 75%;
}

.project-sunmit-modal {
    height: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
}

.btn-submit-project {
    border: 1px solid black;
    width: 40%;
    height: 100%;
    border-radius: 17px;

}

.btn-submit-project:hover {
    box-shadow: 0 0 5px black;
}

.btn-submit-project button {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 20px;
}

/*end modal */
</style>