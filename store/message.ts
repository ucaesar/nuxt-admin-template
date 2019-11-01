import { MutationTree, ActionTree } from 'vuex/types/index'

export const state = () => ({
    text: '',
    visible: false,
    color: 'info'
})

export type MessageState = ReturnType<typeof state>

export const mutations: MutationTree<MessageState> = {
    SET_TEXT: (state: MessageState, text: string) => (state.text = text),
    SET_VISIBLE: (state: MessageState, visible: boolean) =>
        (state.visible = visible),
    SET_COLOR: (state: MessageState, color: string) => (state.color = color)
}

export const actions: ActionTree<MessageState, MessageState> = {
    showMessage({ commit }, { text, color }) {
        commit('SET_TEXT', text)
        commit('SET_COLOR', color)
        commit('SET_VISIBLE', true)
    }
}
