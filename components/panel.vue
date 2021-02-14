<template>
    <div class="panel">
        <div class="logo ml-3">
            <a href="/">monzun</a>
            <a href="#" class="menu-toggle" v-on:click="visible">
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div class="items" v-bind:class="{ menu_toggle_visible: isActive }">
            <ul v-if="user">
                <li class="item" v-if="user.role.roleId == 2">
                    <nuxt-link
                        exact
                        no-prefetch
                        active-class="active"
                        class="nav-link"
                        to="/"
                    >
                        Стартап
                    </nuxt-link>
                </li>
                <li class="item" v-if="user.role.roleId == 2">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/sets"
                    >
                        Мои наборы
                    </nuxt-link>
                </li>
                <li class="item" v-if="user.role.roleId == 2">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/statistika"
                    >
                        Статистика
                    </nuxt-link>
                </li>
                <li class="item" v-if="user.role.roleId == 2">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/request"
                    >
                        Заявки на наборы
                    </nuxt-link>
                </li>
                <li class="item" v-if="user.role.roleId == 3">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/sets_tracker"
                    >
                        Наборы
                    </nuxt-link>
                </li>
                <!-- <li class="item" v-if="user.role.roleId == 3">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/reports"
                    >
                        Отчеты
                    </nuxt-link>
                </li> -->
            </ul>
        </div>
        <div class="version">Версия 1.0</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        visible: function (event) {
            this.isActive = !this.isActive;
        },
    },
};
</script>

<style scoped>
.panel {
    border-right: 1px solid #e2e2e2;
    height: 100%;
    padding-top: 30px;
}
.logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo a {
    font-family: Comfortaa;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 20px;
    text-decoration: none;
    color: #000000;
}
.items {
    margin-top: 140px;
    margin-bottom: 150px;
}
.items ul {
    padding: 0;
}
.items .active {
    border-left: 3px solid #106466;
    margin-left: -3px;
}
.item {
    list-style-type: none;
    margin-top: 23px;
    padding-left: 20px;
}
.item a:hover {
    border-left: 3px solid #106466;
    margin-left: -3px;
}
.item a {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #000000;
    text-decoration: none;
}
.version {
    font-family: Roboto;

    color: #9e9e9e;
    padding-left: 20px;

    bottom: 10px;
    position: absolute;
}
@media (max-width: 991px) {
    .panel {
        border: none;
    }
    .items {
        display: none;
        margin-top: 50px;
        text-align: right;
    }
    .items .active {
        border-right: 3px solid #106466;
        border-left: none;
    }
    .menu-toggle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 20px;
        height: 20px;
        margin-top: 15px;
    }
    .menu-toggle span {
        height: 2px;
        width: 100%;
        background-color: #4d4d4d;
    }
    .menu_toggle_visible {
        display: block;
    }

    .item a:hover {
        border-right: 3px solid #106466;
        border-left: none;
    }
}
</style>
