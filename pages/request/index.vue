<template>
    <div class="sets">
        <div class="container">
            <Client></Client>
            <div class="row">
                <Set
                    v-for="(set, index) in sets"
                    :key="index"
                    :name="set.name"
                    :photo="set.logo"
                    :id="set.id"
                    @getSet="getSet(set.id)"
                ></Set>
            </div>
        </div>
        <b-modal
            centered
            hide-header
            ok-only
            ref="request"
            ok-title="Записаться/Отписаться"
            @ok="requestTracking(activeSet.id)"
            id="modal-request"
        >
            <div class="view-report">
                <div class="text">
                    <div class="request-head">Описание</div>
                    <div class="request-description">
                        {{ activeSet.description }}
                    </div>
                </div>
                <div class="info-report">
                    <img
                        :src="activeSet.logo.url"
                        v-if="activeSet.logo"
                        alt=""
                    />
                    <img
                        src="images/startup1.jpg"
                        v-if="!activeSet.logo"
                        alt=""
                    />
                    <div class="name">
                        {{ activeSet.name }}
                    </div>
                    <div class="date">
                        <div class="date-start">
                            Дата начала <br />
                            {{ activeSet.startedAt }}
                        </div>
                        <div class="date-end">
                            Дата конца <br />
                            {{ activeSet.endedAt }}
                        </div>
                    </div>
                </div>
                <div class="close" @click="$bvModal.hide('modal-request')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Set from "~/components/set.vue";
export default {
    name: "sets",
    components: { Set },
    middleware: "authenticated",
    data: function () {
        return {
            newSet: {},
            activeSet: {},
            sets: [],
            startups: [],
            startup: {},
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
        this.sets = await this.$axios.$get(
            "https://monzun.herokuapp.com/api/requests/trackings",
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        console.log(this.sets);
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
    },
    methods: {
        async getSet(id) {
            try {
                this.activeSet = await this.$axios.$get(
                    `https://monzun.herokuapp.com/api/trackings/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                );
                this.$refs["request"].show();
            } catch {
                this.$bvToast.toast(
                    "Не удалось получить данные пользователя.",
                    {
                        title: "пользователь не найден.",
                        variant: "danger",
                        solid: true,
                    }
                );
            }
        },
        requestTracking(idSet) {
            this.$axios //записаться/отписаться на набор
                .$post(
                    `https://monzun.herokuapp.com/api/requests/${idSet}/${this.startup.id}`,
                    {},
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("успешно!", {
                        title: "успешно",
                        variant: "success",
                    });
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "ошибка",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
    },
};
</script>


<style scoped>
.sets {
    margin-top: 30px;
}
.close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.view-report {
    font-family: Roboto;
    font-size: 18px;
    line-height: 16px;

    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.info-report {
    text-align: center;
}
.info-report img {
    background: #c4c4c4;
    border: 1px solid #000000;
    border-radius: 50%;
    width: 115px;
    height: 118px;
}
.info-report .name {
    margin-top: 16px;
    margin-bottom: 120px;
}
.date {
    display: flex;
    justify-content: space-between;
    line-height: 26px;
}
.date .date-start {
    margin-right: 50px;
}
.view-report .request-description {
    margin-top: 35px;
}
</style>