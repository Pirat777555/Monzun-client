export const state = () => ({
    user: null,
});

export const actions = {
    async nuxtServerInit({commit, dispatch}) {
        await dispatch('getUser');
    },
    async getUser({commit}) {
        try {
            const response = await this.$axios.$get("https://monzun.herokuapp.com/api/me", {
                headers: {
                    Authorization: 'Bearer ' + this.$cookies.get('tokenUser')
                }
            });
            commit('setUser', response);
            this.$router.push({
                name: "index",
            });
        } catch {
            if(this.$cookies.get('tokenUser')) {
                this.$cookies.set('tokenUser', '');
            }
        }
    }
}

export const mutations = {
    setUser: (state, user) => {
        state.user = user;
    }
}