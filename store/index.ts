import { ActionTree } from 'vuex/types/index'
import consola from 'consola'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
    nuxtServerInit() {
        consola.success('This is the entry! - store index')
    }
}
