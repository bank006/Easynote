<script>
import { ref } from 'vue';
import axios from 'axios';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'


export default {

    setup() {
        const router = useRouter();

        const now = dayjs()
        const Timeaddpost = now.format('DD-MM-YYYY HH:mm:ss')
        const Timeaddhistory = now.format('DD-MM-YYYY HH:mm:ss')

        const route = useRoute()

        const showModal = ref(false);
        const showModaledite = ref(false)
        const showhistory = ref(false)

        const closehistory = () => {
            showhistory.value = false
        }


        const closemodal = () => {
            showModal.value = false
        }

        const token = localStorage.getItem('token')

        const config = {
            headers: {
                Authorization: token,
            },
        };


        // fetchingcard
        const items = ref([])
        const idcard = ref([])
        const titles = ref([])
        const listcard = ref([])
        const descriptioncard = ref([])
        const color = ref([])
        const idusers = ref([])
        const name = ref([])
        const idprojects = route.params.idproject

        const openmodal = (listitems) => {
            listcard.value = listitems
            showModal.value = true
        }

        // const openedite =()=>{
        //     showModaledite.value = true
        // }


        watch(() => {
            axios.get('http://localhost:3000/protected', config).then((res) => {
                idusers.value = res.data.user.id
                name.value = res.data.user.name
            }).catch((err) => {
                console.log(err)
                router.push({ name: 'Login' });
            })
        })

        const handlesettitle = (e) => {
            titles.value = e.target.value
        }

        // const handlesetlist = (e) => {
        //     listcard.value = e.target.value
        // }

        // const handlesetcontentcard = (e) => {
        //     contentcard.value = e.target.value
        // }

        const handlesetdescriptioncard = (e) => {
            descriptioncard.value = e.target.value
        }

        const handlesetcolor = (e) => {
            color.value = e.target.value
        }

        //setidcard
        function generateRandomId() {
            const characters = '0123456789';
            const length = 10; // กำหนดความยาวของไอดีที่ต้องการสร้าง

            let randomId = '';
            for (let i = 0; i < length; i++) {
                randomId += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return randomId;
        }

        // ตัวอย่างการใช้งาน
        const randomId = generateRandomId();

        watch(() => {
            const idproject = idprojects
            axios.get(`http://localhost:3000/cards/getcardbyproject/${idproject}`).then((res) => {
                items.value = res.data                
            }).catch((err) => {
                console.log(err)
            })
        })
        // end fetchingcard

        // post card
        const addCard = () => {
            const id = parseInt(randomId )
            const title = titles.value
            const list = listcard.value
            const descriptioncards = descriptioncard.value
            const colors = color.value
            const iduser = idusers.value
            const username = name.value
            const idproject = parseInt(idprojects)

            axios.post('http://localhost:3000/cards/addCards', { id, title, list, descriptioncards, iduser, idproject, colors, Timeaddpost, username }).then((result) => {
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            })
        }
        // end postcard

        // funtion drag and drop
        const getList = (list) => {
            return items.value.filter((item) => item.list == list)
        }



        const startdrang = (event, item) => {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemID', item.id)

        }

        const onDrop = (event, list) => {
            const itemID = event.dataTransfer.getData('itemID');
            const itemss = items.value.find((item) => item.id == itemID);
            itemss.list = list
            updatelist(itemss)

        }

        // end funtion drang drop

        const updatelist = (itemss) => {
            const id = itemss.id
            const list = itemss.list
            axios.put(`http://localhost:3000/cards/update/${id}`, { list })
                .then((result) => {
                    // console.log("update successfully" , result)
                }).catch((err) => {
                    console.log(err)
                })
        }

        const closemodaledite = () => {
            showModaledite.value = false
        }

        const yourcard = ref([])
        const yourhistory = ref([])
        const callcontent = (id) => {
            axios.get(`http://localhost:3000/cards/callcard/${id}`)
                .then((res) => {
                    yourcard.value = res.data
                    showModaledite.value = true
                }).catch((err) => {
                    console.log(err)
                })
        }

        const callhistory = (id) => {
            axios.get(`http://localhost:3000/history/gethistory/${id}`)
                .then((res) => {
                    console.log(res.data)
                    yourhistory.value = res.data
                    showhistory.value = true
                }).catch((err) => {
                    console.log(err)
                })
        }

        const updatecontent = (id, newtitle, newdescription, newiduser) => {
            console.log(id, newtitle, newdescription)
            axios.put(`http://localhost:3000/cards/updatecard/${id}`, { newtitle, newdescription, newiduser })
                .then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })

            axios.post('http://localhost:3000/history/addhistory', { id, newtitle, newdescription, newiduser, Timeaddhistory }).then((res) => {
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
        }

        //deletecard
        const deletecard = (id) => {
            axios.delete(`http://localhost:3000/cards/deletecard/${id}`)
                .then((result) => {
                    window.location.reload();
                }).catch((err) => {
                    console.log(err)
                })
        }



        return {
            getList,
            startdrang,
            onDrop,
            items,
            showhistory,
            handlesettitle,
            handlesetdescriptioncard,
            handlesetcolor,
            addCard,
            openmodal,
            showModal,
            closemodal,
            deletecard,
            yourcard,
            showModaledite,
            callcontent,
            updatecontent,
            closemodaledite,
            closehistory,
            callhistory,
            yourhistory
        }


    }
}

</script>
<template>
    <div class="container-dropzon">
        <div class="boby-containerhome">
            <div class="dropzone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
                <div class="title-dropzone">
                    <div style="background-color: red; height: 2px; border-radius: 2px;"></div>
                    <p>สำคัญมาก</p>
                </div>
                <div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true"
                    @dragstart="startdrang($event, item)">
                    <div :style="{ backgroundColor: item.colors }" class="line"></div>
                    <div class="content-card">
                        <h3>{{ item.title }}</h3>
                        <h5>{{ item.descriptioncards }}</h5>
                        <p>{{ item.Timeaddpost }}</p>
                        <p>ผู้โพสต์ {{ item.username }}</p>
                    </div>

                    <div class="active-zone">
                        <img @click="callhistory(item.id)" src="/dot.svg" alt="">
                        <img @click="callcontent(item.id)" src="/edite.svg" alt="">
                        <img @click="deletecard(item.id)" src="/delete.svg" alt="">
                    </div>
                </div>
                <div class="add-card-inzone">
                    <button @click="openmodal(1)">+ New note</button>
                </div>
            </div>
            <div class="dropzone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
                <div class="title-dropzone">
                    <div style="background-color: orangered; height: 2px; border-radius: 2px;"></div>
                    <p>สำคัญ</p>
                </div>
                <div v-for="item in getList(2)" :key="item.id" class="drag-el" draggable="true"
                    @dragstart="startdrang($event, item)">
                    <div :style="{ backgroundColor: item.colors }" class="line"></div>
                    <div class="content-card">
                        <h3>{{ item.title }}</h3>
                        <h5>{{ item.descriptioncards }}</h5>
                        <p>{{ item.Timeaddpost }}</p>
                        <p>ผู้โพสต์ {{ item.username }}</p>
                    </div>

                    <div class="active-zone">
                        <img @click="callhistory(item.id)" src="/dot.svg" alt="">
                        <img @click="callcontent(item.id)" src="/edite.svg" alt="">
                        <img @click="deletecard(item.id)" src="/delete.svg" alt="">
                    </div>
                </div>
                <div class="add-card-inzone">
                    <button @click="openmodal(2)">+ New note</button>
                </div>
            </div>
            <div class="dropzone" @drop="onDrop($event, 3)" @dragenter.prevent @dragover.prevent>
                <div class="title-dropzone">
                    <div style="background-color: orange; height: 2px; border-radius: 2px;"></div>
                    <p>ด่วนมาก</p>
                </div>
                <div v-for="item in getList(3)" :key="item.id" class="drag-el" draggable="true"
                    @dragstart="startdrang($event, item)">
                    <div :style="{ backgroundColor: item.colors }" class="line"></div>
                    <div class="content-card">
                        <h3>{{ item.title }}</h3>
                        <h5>{{ item.descriptioncards }}</h5>
                        <p>{{ item.Timeaddpost }}</p>
                        <p>ผู้โพสต์ {{ item.username }}</p>
                    </div>

                    <div class="active-zone">
                        <img @click="callhistory(item.id)" src="/dot.svg" alt="">
                        <img @click="callcontent(item.id)" src="/edite.svg" alt="">
                        <img @click="deletecard(item.id)" src="/delete.svg" alt="">
                    </div>
                </div>
                <div class="add-card-inzone">
                    <button @click="openmodal(3)">+ New note</button>
                </div>
            </div>
            <div class="dropzone" @drop="onDrop($event, 4)" @dragenter.prevent @dragover.prevent>
                <div class="title-dropzone">
                    <div style="background-color: goldenrod; height: 2px; border-radius: 2px;"></div>
                    <p>ด่วน</p>
                </div>
                <div v-for="item in getList(4)" :key="item.id" class="drag-el" draggable="true"
                    @dragstart="startdrang($event, item)">
                    <div :style="{ backgroundColor: item.colors }" class="line"></div>
                    <div class="content-card">
                        <h3>{{ item.title }}</h3>
                        <h5>{{ item.descriptioncards }}</h5>
                        <p>{{ item.Timeaddpost }}</p>
                        <p>ผู้โพสต์ {{ item.username }}</p>
                    </div>

                    <div class="active-zone">
                        <img @click="callhistory(item.id)" src="/dot.svg" alt="">
                        <img @click="callcontent(item.id)" src="/edite.svg" alt="">
                        <img @click="deletecard(item.id)" src="/delete.svg" alt="">
                    </div>
                </div>
                <div class="add-card-inzone">
                    <button @click="openmodal(4)">+ New note</button>
                </div>
            </div>
            <div class="dropzone" @drop="onDrop($event, 5)" @dragenter.prevent @dragover.prevent>
                <div class="title-dropzone">
                    <div style="background-color: greenyellow; height: 2px; border-radius: 2px;"></div>
                    <p>ทั่วไป</p>
                </div>
                <div v-for="item in getList(5)" :key="item.id" class="drag-el" draggable="true"
                    @dragstart="startdrang($event, item)">
                    <div :style="{ backgroundColor: item.colors }" class="line"></div>
                    <div class="content-card">
                        <h3>{{ item.title }}</h3>
                        <h5>{{ item.descriptioncards }}</h5>
                        <p>{{ item.Timeaddpost }}</p>
                        <p>ผู้โพสต์ {{ item.username }}</p>
                    </div>

                    <div class="active-zone">
                        <img @click="callhistory(item.id)" src="/dot.svg" alt="">
                        <img @click="callcontent(item.id)" src="/edite.svg" alt="">
                        <img @click="deletecard(item.id)" src="/delete.svg" alt="">
                    </div>
                </div>
                <div class="add-card-inzone">
                    <button @click="openmodal(5)">+ New note</button>
                </div>
            </div>
        </div>
        <modal name="my-modal" v-if="showModal" @close="showModal = false">
            <div class="modal-home">

                <div class="item-modal-home">
                    <div class="img-close-modal">
                        <img width="20" height="20" @click="closemodal" src="/close.svg" alt="">
                    </div>
                    <div class="content-input-home">
                        <label for="titlenote">หัวข้อโน๊ต</label>
                        <div class="item-input-home">
                            <input @change="handlesettitle" type="text" id="titlenote">
                        </div>
                    </div>
                    <div class=" content-input-home">
                        <label for="descriptioncard">เกี่ยวกับ</label>
                        <div class="item-input-home">
                            <input @change="handlesetdescriptioncard" type="text" list="contentcard">
                        </div>
                    </div>
                    <div class=" content-input-homes">
                        <label for="comment">สี</label>
                        <input @change="handlesetcolor" type="color" name="comment" value="#FFFFFF">
                    </div>
                    <div class="btn-input-home">
                        <button @click="addCard">addcard</button>
                    </div>

                </div>
            </div>
        </modal>
        <modal class="my-modal" v-if="showModaledite" @close="showModaledite = false">
            <div class="modal-home">
                <div class="item-modal-home">
                    <div class="img-close-modal">
                        <img width="20" height="20" @click="closemodaledite" src="/close.svg" alt="">
                    </div>
                    <div style="text-align: center;">
                        <h1>แก้ไข</h1>
                    </div>
                    <div v-for="item in yourcard">
                        <div class="content-input-home">
                            <label for="titlenote">หัวข้อโน๊ต</label>
                            <div class="item-input-home">
                                <input v-model="item.title" @change="handlesettitle" type="text" id="titlenote">
                            </div>
                        </div>
                        <div class=" content-input-home">
                            <label for="descriptioncard">เกี่ยวกับ</label>
                            <div class="item-input-home">
                                <input v-model="item.descriptioncards" @change="handlesetdescriptioncard" type="text"
                                    list="contentcard">
                            </div>
                        </div>
                        <div class="btn-input-home">

                            <button
                                @click="updatecontent(item.id, item.title, item.descriptioncards, item.iduser)">edit</button>

                        </div>
                    </div>

                </div>
            </div>
        </modal>

        <modal class="my-modal">
            <div class="modal-home" v-if="showhistory" @close="showhistory = false">
                <div class="modal-history">
                    <div class="img-close-modal">
                        <img width="20" height="20" @click="closehistory" src="/close.svg" alt="">
                    </div>
                    <div class="title-history">
                        <p>ประวัติการเเก้ไข</p>
                    </div>
                    <div class="item-box-history" v-if="yourhistory.length > 0">
                        <div >
                            <div class="item-all-history" v-for="item in yourhistory" :key="item.id">
                                <div class="content-history">
                                    <p>หัวข้อ {{ item.newtitle }}</p>
                                </div>
                                <div class="content-history">
                                    <p>เนื้อหา {{ item.newdescription }}</p>
                                </div>
                                <div lass="content-history">
                                    <p>เวลาเเก้ไข {{ item.Timeaddhistory }}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div v-else class="none-history">
                        <p>ไม่มีประวัติการแก้ไข</p>
                    </div>

                </div>

            </div>
        </modal>

    </div>
    <!-- <div v-else>
        <p>ไม่มีข้อมูล</p>
    </div> -->
    <!-- <div v-if="showModal === false">
        <button @click="openmodal">open</button>
    </div>
    <div v-else>
        <button @click="closemodal">close</button>
    </div> -->


</template>
<style>
.container-dropzon {
    height: 90vh;
    overflow: scroll;
}

.boby-containerhome {
    display: flex;
    height: 100%;
}

.dropzone {
    color: rgb(0, 0, 0);
    width: 220px;
    height: 100%;
    margin: 20px;

}

.title-dropzone {
    height: 50px;
    /* padding: 10px; */
    margin-bottom: 10px;
    border-radius: 6px;
    box-shadow: 0 0 5px black;
    background-color: rgb(255, 255, 255);
}

.title-dropzone p {
    padding: 10px;
}


.drag-el {
    cursor: pointer;
    background-color: white;
    box-shadow: 0 0 5px black;
    /* height: 20%; */
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px
}

.content-card {
    overflow: scroll;
    height: 70%;
    width: 100%;
}

.content-card h5 {
    overflow-wrap: break-word;
}

.content-card h3 {
    overflow-wrap: break-word;
}

.content-card p {
    overflow-wrap: break-word;
    margin-top: 10px;
    font-size: 12px;
}


.active-zone {
    margin-top: 10px;
    text-align: end;
}

.active-zone img {
    width: 13px;
    height: 13px;
    margin-right: 10px;
    transition: all 0.2s ease-in-out;
}

.active-zone img:hover {
    transform: scale(1.5);
}

.line {
    height: 5px;
    border-radius: 10px;
    margin-bottom: 4px;
}

/* .add-card-inzone{
    border: 1px solid black;
} */

.add-card-inzone button {
    cursor: pointer;
    border: none;
    background: none;
    color: rgb(154, 154, 154);
}



/* modal */

.modal-home {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-modal-home {
    width: 200px;
    border-radius: 15px;
    padding: 15px;
    background-color: white;
    box-shadow: 0 0 5px black;
}

.img-close-modal {
    cursor: pointer;
    text-align: end;
}

.content-input-home {
    margin-bottom: 20px;
    height: 50px;
    width: 100%;
}

.content-input-homes {
    margin-bottom: 10px;
}

.item-input-home {
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 13px;
    border: 1px solid black;
}

.item-input-home input {
    margin-left: 5px;
    width: 90%;
    height: 90%;
    border: 1px;
    outline: none;
}

.btn-input-home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
}

.btn-input-home button {
    height: 100%;
    width: 60%;
    border: none;
    background: none;
    cursor: pointer;
    background-color: rgb(136, 205, 251);
    border-radius: 13px
}

.modal-history {
    width: 300px;
    height: 300px;
    border-radius: 13px;
    background-color: white;
    box-shadow: 0 0 5px black;
}

.title-history {
    font-size: 23px;
    margin-bottom: 10px;
    text-align: center;
}

.item-box-history {
    height: 200px;
    display: flex;
    justify-content: center;
    overflow: scroll;

}

.item-all-history {
    margin-bottom: 15px;
    border: 1px solid black;
    width: 250px;
    border-radius: 13px;
    padding: 10px;
}

.content-history {
    margin-bottom: 5px;
}

.none-history{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 23px;
    height: 200px;
}

/* end modal */
</style>