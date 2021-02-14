<template>
    <div class="col-12 col-lg-3 mb-3">
        <div class="user">
            <div class="user-photo">
                <img :src="photo.url" v-if="photo" alt="" />
                <img src="/images/set1.png" v-if="!photo" alt="" />
            </div>
            <div class="user-login">{{ name }}</div>
            <button class="details" @click="$emit('getSet')">
                Подробнее <img src="/images/arrow.svg" alt="" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "user",
    props: {
        id: {
            type: Number,
            default: null,
        },
        name: {
            type: String,
            default: "",
        },
        photo: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        startData: {
            type: String,
            default: "",
        },
        endData: {
            type: String,
            default: "",
        },
        active: {
            type: Boolean,
            default: true,
        },
        startups: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
};
</script>

<style scoped>
.user {
    background: #3a3a3a;
    padding: 10px;
    text-align: left;
    height: 100%;
}
.user:hover .edit {
    opacity: 1;
}
.user:hover .details {
    opacity: 1;
}
.user:hover {
    box-shadow: 0px 2px 22px rgba(27, 32, 44, 0.25);
    background: #535353;
}
.user-login {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-top: 20px;
    text-align: left;
    cursor: pointer;
}
.user-photo img {
    text-align: center;
    width: 100%;
    margin-top: 50px;
}
.details {
    text-align: left;
    cursor: pointer;
    opacity: 0;
    border: none;
    background: transparent;
    margin-top: 10px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;

    color: #ffffff;
}
.btn {
    padding: 0;
}
.edit {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    opacity: 0;
}
.edit .change {
    margin-right: 10px;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
}
.edit .delete {
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
}
</style>
