<template>
    <div class="sets">
        <div class="container">
            <Client></Client>
            <div class="row justify-content-end">
                <div class="col-auto">
                    <button class="btn-back" @click.prevent="$router.go(-1)">
                        Назад
                    </button>
                </div>
            </div>
            <div class="row info-set">
                <div class="col-lg-3">{{ activeSet.name }}</div>
                <div class="col-lg-3">
                    Дата конца набора
                    {{ activeSet.endedAt }}
                </div>
                <div class="col-lg-3">
                    Неделя {{ weekDate(activeSet.startedAt) }}
                </div>
                <div class="col-lg-3">
                    <NoSsr placeholder="loading...">
                        <progress-bar
                            :value="
                                progres(activeSet.startedAt, activeSet.endedAt)
                            "
                        />
                    </NoSsr>
                </div>
            </div>
            <div class="row mt-5">
                <Startup
                    v-for="(startup, index) in startups"
                    :key="index"
                    :name="startup.name"
                    :photo="startup.logo"
                    :id="startup.id"
                    @getStartup="getStartup(startup.id)"
                    @getStartupReport="getStartupReport(startup.id)"
                ></Startup>
            </div>
        </div>
    </div>
</template>

<script>
import Startup from "~/components/startup2.vue";
export default {
    name: "sets",
    components: { Startup },
    middleware: "authenticated",
    data: function () {
        return {
            newSet: {},
            activeSet: {},
            startups: [],
        };
    },
    async created() {
        this.activeSet = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/trackings/${this.$route.params.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        console.log(this.activeSet);
        this.startups = this.activeSet.startups;
        console.log(this.startups);
    },
    methods: {
        getStartup(id) {
            this.$router.push({
                name: "sets_tracker-id-slug",
                params: { slug: id, idSet: this.$route.params.id },
            });
        },
        getStartupReport(id) {
            this.$router.push({
                name: "sets_tracker-id-report",
                params: { report: id, idSet: this.$route.params.id },
            });
        },
        weekDate(value) {
            var date1 = new Date(value);
            let now = new Date();
            let entireWeek = Math.ceil(
                Math.ceil(
                    (now.getTime() - date1.getTime()) / (1000 * 3600 * 24)
                ) / 7
            );
            if (entireWeek < 0) {
                entireWeek = 0;
            }
            return entireWeek;
        },
        progres(start, end) {
            let date1 = new Date(start);
            let date2 = new Date(end);
            let date3 = new Date();
            let daysLag = Math.ceil(
                (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
            );
            let today = Math.ceil(
                (date3.getTime() - date1.getTime()) / (1000 * 3600 * 24)
            );
            let pr = Math.ceil((today / daysLag) * 100);

            if (pr >= 100) {
                pr = 100;
            }
            if (pr < 0) {
                pr = 0;
            }
            return pr;
        },
    },
};
</script>


<style scoped>
.sets {
    margin-top: 30px;
}
.info-set {
    border: 1px solid #000000;
    padding: 35px;
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
    margin-bottom: 30px;
}
</style>