<template>
    <div class="admin">
        <div class="logo">Monzun</div>
        <div class="login" :class="{ 'login-active': registration }">
            <form @submit.prevent="auth" class="form-horizontal">
                <div class="heading">Вход</div>
                <div class="form-group">
                    <div class="text-form">Электронная почта</div>
                    <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        id="inputEmail"
                    />
                </div>
                <div class="form-group help">
                    <div class="text-form">Пароль</div>
                    <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        id="inputPassword"
                    />
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default">Вход</button>
                    <div class="forgot-password">Забыли пароль?</div>
                    <div class="forgot-password" @click="visible">
                        Регистрация
                    </div>
                </div>
            </form>
        </div>
        <div
            class="registration"
            :class="{ 'registration-active': registration }"
        >
            <form @submit.prevent="reg" class="form-horizontal">
                <div class="heading">Регистрация</div>
                <div class="form-group">
                    <div class="text-form">Имя</div>
                    <input
                        type="text"
                        class="form-control"
                        id="inputName"
                        v-model="newUser.name"
                    />
                </div>
                <div class="form-group">
                    <div class="text-form">Электронная почта</div>
                    <input
                        type="email"
                        class="form-control"
                        id="Email"
                        v-model="newUser.email"
                    />
                </div>
                <div class="form-group help">
                    <div class="text-form">Пароль</div>
                    <input
                        type="password"
                        class="form-control"
                        id="Password"
                        v-model="newUser.password"
                    />
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-default mt-5">
                        Зарегистрироваться
                    </button>
                    <div class="cancel" @click="visible">Отмена</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    layout: "empty",
    data() {
        return {
            registration: false,
            email: null,
            password: null,
            newUser: {},
            logo: null,
            file: "",
        };
    },
    methods: {
        auth() {
            this.$axios
                .$post("https://monzun.herokuapp.com/api/auth/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    if (response && response.token) {
                        this.$cookies.set("tokenUser", response.token);
                        
                        this.$bvToast.toast("Авторизация прошла успешно!", {
                            title: "Авторизация",
                            variant: "success",
                        });

                        this.$store.dispatch("getUser");
                    }
                })
                .catch((err) => {
                    this.$bvToast.toast(
                        "Введите корректный email или пароль.",
                        {
                            title: "Не удалось авторизоваться.",
                            variant: "danger",
                            solid: true,
                        }
                    );
                });
        },
        reg() {
            console.log(this.newUser);
            this.$axios
                .$post(
                    "https://monzun.herokuapp.com/api/auth/register",
                    this.newUser
                )
                .then((response) => {
                    this.$cookies.set("tokenUser", response.token);
                    
                    this.$bvToast.toast("Регистрация прошла успешно!", {
                        title: "Регистрация",
                        variant: "success",
                    });
                    this.newUser = {};
                    this.registration = !this.registration;
                })
                .catch((err) => {
                    this.$bvToast.toast("Введите корректные данные", {
                        title: "Не удалось зарегистрироваться.",
                        variant: "danger",
                        solid: true,
                    });
                });
        },

        visible: function (event) {
            this.registration = !this.registration;
        },
    },
};
</script>

<style scoped>
.admin {
    margin: auto;
}
.heading {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 23px;
    margin-bottom: 30px;
    color: #000000;
}
.logo {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 55px;
    line-height: 64px;
    text-align: center;

    color: #ffffff;
    padding-top: 100px;
}
.form-horizontal {
    background: #ffffff;
    border-radius: 5px;
    padding: 35px 15px;
    width: 740px;
    margin: auto;
    margin-top: 30px;
    text-align: center;
}
.btn-default {
    background: #106466;
    border-radius: 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: #ffffff;
    padding: 10px 37px;
    margin: auto;
}
.form-group input {
    padding: 25px;
    margin-bottom: 20px;
    background: #c4c4c4;
    border-radius: 5px;
    border: none;
}
.forgot-password {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 14px;
    color: #000000;
    margin-top: 30px;
    cursor: pointer;
}
.text-form {
    font-family: Roboto;
    color: #000000;
    text-align: left;
}
.registration {
    display: none;
}
.registration-active {
    display: block;
}
.login-active {
    display: none;
}
.cancel {
    cursor: pointer;
}
</style>