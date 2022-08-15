// 用户状态管理

const types = {
    SET_AUTHORIZATED:"SET_AUTHORIZATED",
    SET_USER:"SET_USER"
};

const state = {
    isAuthorizated:false,
    user:{},
};
const getters = {
    isAuthorizated:state => state.isAuthorizated,
    user:state => state.user,
};
const mutation = {
    [types.SET_AUTHENTICATED](state, authorization){
        state.isAuthorizated = authorization;
    },
    [types.SET_USER](state, user){
        state.user = user;
    },
};
const actions = {
    setAuthorizated:({commit}, authorization) => {
        commit("types.SET_AUTHENTICATED", authorization);
    },
    setUser:({commit}, user) => {
        commit("types.SET_USER", user);
    },
    clearState:({commit}) => {
        commit("types.SET_AUTHENTICATED", false);
        commit("types.SET_USER", null);
    }
};

const userStore = {
    state,
    getters,
    mutation,
    actions
}

console.log(userStore.state)
export default userStore