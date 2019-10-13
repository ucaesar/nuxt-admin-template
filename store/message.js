export const state = () => ({
    text: '',
    visible: false,
    color: 'info'
})

export const mutations = {
    SET_TEXT(state, text) {
        state.text = text
    },
    SET_VISIBLE(state, visible) {
        state.visible = visible
    },
    SET_COLOR(state, color) {
        state.color = color
    }
}

export const actions = {
    showMessage({ commit }, { text, color }) {
        commit('SET_TEXT', text)
        commit('SET_COLOR', color)
        commit('SET_VISIBLE', true)        
    }
}
