<template>
    <div class="main">
        <div class="container">
            <Client></Client>
            <div class="row">
                <div class="сol-lg-9">
                    <div class="create-startup">
                        <div class="tracker">
                            <div
                                class="text"
                                v-bind:class="{ 'edit-visible': btnActive }"
                            >
                                Мой стартап
                            </div>
                            <div
                                class="text"
                                v-bind:class="{ 'edit-visible': !btnActive }"
                            >
                                Изменить стартап
                            </div>
                        </div>
                        <form class="d-flex justify-content-between">
                            <div class="info">
                                <div class="name">
                                    <div class="text-form">Имя</div>
                                    <input type="text" v-model="startup.name" />
                                </div>
                                <div class="description">
                                    <div class="text-form">Описание</div>
                                    <textarea
                                        cols="60"
                                        rows="5"
                                        v-model="startup.description"
                                    ></textarea>
                                </div>
                                <div class="target">
                                    <div class="text-form">Цели стартапа</div>
                                    <textarea
                                        cols="10"
                                        rows="5"
                                        v-model="startup.points"
                                    ></textarea>
                                </div>
                                <div class="plan-commercial">
                                    <div class="text-form">
                                        Коммерческий план
                                    </div>
                                    <textarea
                                        cols="10"
                                        rows="5"
                                        v-model="startup.businessPlan"
                                    ></textarea>
                                </div>
                                <div class="plan-grow">
                                    <div class="text-form">План роста</div>
                                    <textarea
                                        name=""
                                        id=""
                                        cols="10"
                                        rows="5"
                                        v-model="startup.growthPlan"
                                    ></textarea>
                                </div>
                                <div class="area">
                                    <div class="text-form">
                                        Область применения
                                    </div>
                                    <textarea
                                        cols="10"
                                        rows="5"
                                        v-model="startup.useArea"
                                    ></textarea>
                                </div>
                                <div class="tasks">
                                    <div class="text-form">Задачи</div>
                                    <textarea
                                        cols="10"
                                        rows="5"
                                        v-model="startup.tasks"
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="create-startup">
                        <div
                            v-if="startups.length != 0"
                            class="edit"
                            @click="visible"
                            v-bind:class="{ 'edit-visible': btnActive }"
                        >
                            <img src="images/edit.png" alt="" />
                        </div>
                        <div class="avatar">
                            <img :src="url" v-if="url" alt="" class="avatar" />
                            <img
                                src="images/startup1.png"
                                v-if="!url"
                                alt=""
                                class="avatar"
                            />
                        </div>
                        <div class="block">
                            <div
                                class="user-block"
                                v-if="btnActive == true || startups.length == 0"
                            >
                                <input
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    id="file"
                                    ref="file"
                                    @change="onFileChange"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        class="files"
                        v-if="btnActive == true || startups.length == 0"
                    >
                        <img src="images/file.png" alt="" class="mb-2" />
                        <input
                            type="file"
                            multiple
                            required
                            id="files"
                            ref="files"
                            @change="onSomeFilesChange"
                        />
                    </div>
                    <div
                        class="files"
                        v-bind:class="{ 'edit-visible': btnActive }"
                    >
                        <div
                            v-for="(file, index) in startup.attachments"
                            :key="index"
                        >
                            <a :href="file.url" target="_blank"
                                ><img src="images/file.png" alt="" class="mb-2"
                            /></a>
                            {{ file.originalFilename }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto">
                    <button
                        class="btn-create"
                        @click="createStartup"
                        v-if="startups.length == 0"
                    >
                        Создать
                    </button>
                    <button
                        @click="visible"
                        class="btn-edit"
                        v-bind:class="{ 'edit-visible': !btnActive }"
                    >
                        Отмена
                    </button>
                    <button
                        class="btn-edit"
                        @click="changeStartup(startup.id)"
                        v-bind:class="{ 'edit-visible': !btnActive }"
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Client from "~/components/client.vue";
export default {
    name: "index",
    middleware: "authenticated",
    data() {
        return {
            url: null,
            btnActive: false,
            file: "",
            startup: { fileIds: [] },
            startups: [],
            url: null,
            logo: {},
            listFiles: [],
            fileIds: [],
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    async created() {
        if (this.user.role.roleId == 3) {
            this.$router.push({ name: "sets_tracker" });
        }
        this.startups = await this.$axios.$get(
            "https://monzun.herokuapp.com/api/startups",
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        if (this.startups.length > 0) {
            this.startup = await this.$axios.$get(
                `https://monzun.herokuapp.com/api/startups/${this.startups[0].id}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + this.$cookies.get("tokenUser"),
                    },
                }
            );
        }
        // this.startup = this.startups[0];
        if (this.startup.logo) {
            this.url = this.startup.logo.url;
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        createStartup() {
            this.$axios
                .$post(
                    "https://monzun.herokuapp.com/api/startups",
                    this.startup,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("стартап добавлен!", {
                        title: "Добавление стартапа",
                        variant: "success",
                    });
                    this.users.push(response);
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось добавить стартап",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        visible: function (event) {
            this.btnActive = !this.btnActive;
        },
        change() {
            //Отправка изменений
            this.btnActive = !this.btnActive;
        },
        changeStartup(id) {
            this.$axios
                .$put(
                    `https://monzun.herokuapp.com/api/startups/${id}`,
                    this.startup,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("стартап изменен!", {
                        title: "Изменение стартапа",
                        variant: "success",
                    });
                    this.btnActive = !this.btnActive;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось изменить стартап",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        createStartup() {
            this.$axios //отправка данных набора на сервер
                .$post(
                    "https://monzun.herokuapp.com/api/startups",
                    this.startup,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("стартап создан!", {
                        title: "новый стартап",
                        variant: "success",
                    });
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось создать стартап",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            if (e.target.files[0].size > 5000000) {
                alert("File is too big!");
                this.$refs.file.value = null;
            }
            this.file = this.$refs.file.files[0];
            let formData = new FormData();
            formData.append("files", this.file);
            this.$axios //отправка изображения на сервер
                .$post(
                    "https://monzun.herokuapp.com/api/attachment/upload-image",
                    formData,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Изображение добавлено!", {
                        title: "Добавление изображения",
                        variant: "success",
                    });
                    this.logo = response;
                    this.startup.logoId = this.logo.id;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось отправить изображение",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        onSomeFilesChange(e) {
            this.files = this.$refs.files.files;
            let formData = new FormData();
            for (var i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                formData.append("files", file);
            }
            this.$axios //отправка файлов на сервер
                .$post(
                    "https://monzun.herokuapp.com/api/attachment/upload",
                    formData,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("файлы добавлены!", {
                        title: "Добавление файлов",
                        variant: "success",
                    });
                    this.listFiles = response;
                    for (let i = 0; i < this.listFiles.length; i++) {
                        this.fileIds.push(this.listFiles[i].id);
                    }
                    this.startup.fileIds = this.fileIds;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось загрузить файлы",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
    },
};
</script>

<style>
.main {
    margin-top: 30px;
}

.control-tracker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}
.control-tracker .users {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #333333;
}
.btn-add {
    background: #106466;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    padding: 13px 25px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
    border-radius: 0 !important;
}
.tracker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
}
.create-startup .text {
    font-family: Roboto;
    font-size: 20px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #000000;
}
.delete-tracker .text {
    font-family: Roboto;
    font-size: 20px;
    line-height: 21px;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
}
.create-startup .avatar {
    width: 120px;
    height: 120px;
    background: #c4c4c4;
    border: 1px solid #000000;
    border-radius: 50%;
    overflow: hidden;
}
.create-startup .avatar img {
    width: 100%;
}
form .text-form {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    color: #000000;
    margin-bottom: 15px;
}
form input,
form textarea {
    width: 90%;
    margin-bottom: 50px;
    padding: 10px;
}
.user-block {
    margin-top: 30px;
}
.check-block {
    width: 40px;
    height: 40px;
    border: 1px solid #000000;
    margin-left: 10px;
    text-align: center;
}
.btn-create,
.btn-edit {
    background: #c4c4c4;
    border: 1px solid #000000;
    padding: 15px 40px;
    font-family: Roboto;
    color: #000000;
}
.files {
    text-align: left;
    bottom: 50px;
    position: absolute;
}
.edit {
    text-align: right;
    cursor: pointer;
}
.edit-visible {
    display: none !important;
}
</style>
