import { Navigation } from '@/conf/admin/navigation'
import { MutationTree } from 'vuex/types/index'

export const state = () => ({
    drawer: true,
    navigations: [] as Navigation[]
})

export type AdminState = ReturnType<typeof state>

export const mutations: MutationTree<AdminState> = {
    SET_DRAWER: (state: AdminState, drawer: boolean) => (state.drawer = drawer),
    SET_NAVIGATIONS: (state: AdminState, navigations: Navigation[]) =>
        (state.navigations = navigations)
}
