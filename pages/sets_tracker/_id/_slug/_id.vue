<template>
    <div class="statistic">
        <Client></Client>
        <div class="row">
            <div
                class="col-12 d-flex justify-content-between align-items-center"
            >
                <div class="photo">
                    <img :src="activeSet.photo" alt="" class="image-set" />
                </div>
                <button
                    class="btn-back"
                    @click.prevent="$router.push('/statistika/')"
                >
                    Назад
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4">{{ activeSet.name }}</div>
            <div class="col-4">Текущая неделя: {{ week }}</div>
            <div class="col-4">
                Итоговая оценка: {{ weekReports.avgEstimate }}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Недели</th>
                            <th scope="col">Оценки</th>
                            <th scope="col">Отчет</th>
                        </tr>
                    </thead>
                    <tbody
                        v-for="(item, index) in weekReports.weeks"
                        :key="index"
                    >
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{ item.estimate }}
                                <span v-if="!item.reportId">Нет отчёта</span>
                            </td>
                            <td>
                                <b-button class="link" v-if="!item.reportId">
                                    Нет отчёта</b-button
                                >
                                <b-button
                                    class="link"
                                    @click="getReport(item.reportId)"
                                    v-if="item.reportId"
                                >
                                    Отчёт</b-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="report"
                    id="modal-report"
                >
                    <div class="view-report">
                        <div>
                            <div class="text">Коментарий</div>
                            <div class="comment">
                                {{ activeReport.comment }}
                            </div>
                        </div>
                        <div>
                            <div class="mark mb-5" v-if="activeReport.estimate">
                                Оценка: {{ activeReport.estimate.score }}
                                {{ activeReport.estimate.description }}
                            </div>
                            <div
                                class="file"
                                v-for="(
                                    file, index
                                ) in activeReport.attachments"
                                :key="index"
                            >
                                <a :href="file.url" target="_blank"
                                    ><img
                                        src="/images/file.png"
                                        alt=""
                                        class="mb-2"
                                /></a>
                                {{ file.originalFilename }}
                            </div>
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-report')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            activeSet: {},
            weekReports: {},
            activeReport: {},
            weel: null,
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

        this.activeSet = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/trackings/${this.$route.params.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        this.weekReports = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/stats/${this.$route.params.id}/${this.startup.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        console.log(this.weekReports);
        if (this.weekReports.weeks) {
            this.week = this.weekReports.weeks.length;
        } else {
            this.week = 0;
        }
    },
    methods: {
        async getReport(id) {
            try {
                this.activeReport = await this.$axios.$get(
                    `https://monzun.herokuapp.com/api/week-reports/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                );
                this.$refs["report"].show();
            } catch {
                this.$bvToast.toast("Не удалось получить данные задачи.", {
                    title: "задача не найдена.",
                    variant: "danger",
                    solid: true,
                });
            }
        },
    },
};
</script>
<style scoped>
.statistic {
    margin-top: 30px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
}
.name {
    font-family: Futura PT;
    font-size: 18px;
    line-height: 115%;

    color: #77797d;
}
.admin {
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 50px;
}
.admin .avatar {
    margin-right: 10px;
}
.btn-back {
    background: #c4c4c4;
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: 100px;
    height: 35px;
}
.image-set {
    background: #c4c4c4;
    background-size: auto;
    border: 1px solid #000000;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-right: 5px;
}
.table {
    text-align: center;
    margin-left: 5%;
    width: 90%;
}
.link {
    background: transparent;
    border: none;
    color: #000000;
    padding: 0;
}
.view-report {
    display: flex;
    justify-content: space-between;
}
.view-report .close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.view-report .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
}
.view-report .comment {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #000000;
    margin-top: 15px;
}
.view-report .file a {
    font-family: Roboto;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    text-decoration: none;
}
.view-report .file {
    text-align: center;
}
</style>