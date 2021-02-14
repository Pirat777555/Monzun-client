<template>
    <div class="row admin-panel">
        <div class="col-12 admin d-flex">
            <div class="avatar">
                <img :src="user.logo.url" v-if="user.logo" alt="" />
                <img src="/images/noname.jpg" v-if="!user.logo" alt="" />
            </div>
            <div class="name">{{ editUser.name }}</div>
            <div class="open-toggle" @click="visible">
                <img src="/images/dropdown-toggle.png" alt="" />
            </div>
        </div>
        <div class="col-12 admin d-flex">
            <div class="panel" v-bind:class="{ 'panel-active': isActive }">
                <ul>
                    <li>
                        <b-button class="btn-edit" v-b-modal.modal-edit
                            >Редактировать</b-button
                        >
                    </li>
                    <li>
                        <nuxt-link
                            :to="{ name: 'login' }"
                            @click.native="
                                $cookies.set('tokenUser', '');
                                $store.commit('setUser', null);
                            "
                            >Выход</nuxt-link
                        >
                    </li>
                </ul>
            </div>
        </div>
        <b-modal
            centered
            hide-header
            ok-only
            ok-title="Изменить"
            id="modal-edit"
            @ok="changeUser"
        >
            <div class="edit">
                <form method="post">
                    <div>
                        <img
                            src="images/noname.jpg"
                            alt=""
                            class="edit-avatar"
                            v-if="!url"
                        />
                        <img v-if="url" :src="url" class="edit-avatar" />
                    </div>
                    <div class="edit-image d-flex">
                        <input
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            ref="file"
                            @change="onFileChange"
                        />
                        <div class="dlt" @click="deleteImage">
                            <img src="/images/delete.png" alt="" />
                        </div>
                    </div>

                    <div class="edit-text">Имя</div>
                    <input type="text" class="edit-info" v-model="user.name" />
                    <div class="edit-text">Электронная почта</div>
                    <input
                        type="email"
                        class="edit-info"
                        v-model="user.email"
                    />
                    <div class="edit-text">Пароль</div>
                    <input
                        type="password"
                        class="edit-info"
                        v-model="user.password"
                    />
                    <div class="edit-text">Телефон</div>
                    <input type="tel" class="edit-info" v-model="user.phone" />
                </form>
                <div class="close" @click="$bvModal.hide('modal-edit')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            isActive: false,
            file: [],
            url: null,
            file: "",
            editUser: {
                email: "",
                name: "",
                phone: "",
                avatarId: null,
            },
            logo: {},
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    async created() {
        this.editUser.name = this.user.name;
        if (this.user.logo) {
            this.url = this.user.logo.url;
        }
    },
    methods: {
        visible: function (event) {
            this.isActive = !this.isActive;
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
                    this.editUser.avatarId = this.logo.id;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось отправить изображение",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        deleteImage() {
            this.$axios
                .$delete(
                    `https://monzun.herokuapp.com/api/attachment/delete/${this.logo.uuid}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Изображение удалено!", {
                        title: "удаление изображений",
                        variant: "success",
                    });
                    this.$refs.file.value = null;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить изображение",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        changeUser() {
            this.editUser.name = this.user.name;
            this.editUser.phone = this.user.phone;
            this.editUser.email = this.user.email;
            this.editUser.name = this.user.name;
            this.editUser.password = this.user.password;
            console.log(this.editUser);
            this.$axios
                .$put(`https://monzun.herokuapp.com/api/me`, this.editUser, {
                    headers: {
                        Authorization:
                            "Bearer " + this.$cookies.get("tokenUser"),
                    },
                })
                .then((response) => {
                    this.$bvToast.toast("Пользователь изменен!", {
                        title: "Изменение пользователя",
                        variant: "success",
                    });
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось изменить пользователя",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
    },
};
</script>
<style scoped>
.admin-panel {
    margin-bottom: 50px;
}
.name {
    font-size: 18px;
    line-height: 115%;
    font-family: Futura PT;
    color: #77797d;
    margin-right: 5px;
}
.admin {
    align-items: center;
    justify-content: flex-end;
}
.admin .avatar {
    margin-right: 10px;
}
.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
}
.open-toggle {
    cursor: pointer;
}
.admin-panel:hover .panel {
    opacity: 1;
}
.panel {
    border: 1px solid #e2e2e2;
    padding: 7px;
    background: #f7f5f5;
    padding-left: 20px;
    opacity: 0;
    width: 160px;
}
.panel-active {
    opacity: 1;
}
.panel li {
    list-style-type: none;
    border-bottom: 1px solid #e2e2e2;
    margin-top: 10px;
}
.panel li a {
    color: #000000;
    text-decoration: none;
}
.panel ul {
    padding: 0;
    margin: 0;
    text-align: center;
}
.btn-edit {
    padding: 0;
    background: transparent;
    border: none;
    color: #000000;
}
.close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.edit {
    text-align: center;
}
.edit-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
}
.edit-text {
    font-family: Roboto;
    font-size: 18px;
    line-height: 16px;
    text-align-last: left;
    color: #000000;
    margin-left: 80px;
    margin-bottom: 10px;
    margin-top: 10px;
}
form input {
    width: 80%;
    padding: 10px;
}
.edit-image {
    width: 80%;
    margin-left: 150px;
}
.edit-image input {
    width: 400px;
}
</style>