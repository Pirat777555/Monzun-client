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
    methods: {
        getSet(id) {
            this.$router.push({ name: "reports-id", params: { id: id } });
        },
    },
};
</script>


<style scoped>
.sets {
    margin-top: 30px;
}
</style>