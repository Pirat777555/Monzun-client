<template>
    <div class="sets">
        <div class="container">
            <Client></Client>
            <div class="row">
                <Startup
                    v-for="(startup, index) in startups"
                    :key="index"
                    :name="startup.name"
                    :photo="startup.photo"
                    :id="startup.id"
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
            "https://monzun-admin.herokuapp.com/api/trackings",
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
    },
};
</script>


<style scoped>
.sets {
    margin-top: 30px;
}
</style>