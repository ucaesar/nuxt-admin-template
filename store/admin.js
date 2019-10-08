// import Vue from 'vue'

export const state = () => ({
    navigations: []
})

export const mutations = {
    SET_NAVIGATIONS(state, navigations) {
        state.navigations = navigations;
    }
}

export const actions = {
}
