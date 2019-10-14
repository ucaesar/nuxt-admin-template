// import Vue from 'vue'

export const state = () => ({
    drawer: true,
    navigations: []
})

export const mutations = {
    SET_DRAWER(state, drawer) {
        state.drawer = drawer
    },
    SET_NAVIGATIONS(state, navigations) {
        state.navigations = navigations
    }
}

export const actions = {}
