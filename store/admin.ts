import { MutationTree, ActionTree } from 'vuex/types/index';

import { Navigation } from '@/conf/admin/navigation';

export const state = () => ({
    drawer: true,
    navigations: [] as Navigation[]
});

export type AdminState = ReturnType<typeof state>;

export const mutations: MutationTree<AdminState> = {
    SET_DRAWER: (state: AdminState, drawer: boolean) => {
        state.drawer = drawer;
    },
    SET_NAVIGATIONS: (state: AdminState, navigations: Navigation[]) => {
        state.navigations = navigations;
    }
};

export const actions: ActionTree<AdminState, AdminState> = {
    toogleDrawer({ commit, state }) {
        commit('SET_DRAWER', !state.drawer);
    }
};
