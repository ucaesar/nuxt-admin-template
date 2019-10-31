import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import { Navigation } from '@/conf/admin/navigation'

@Module({
    name: 'admin',
    stateFactory: true,
    namespaced: true
})
class AdminModule extends VuexModule {
    drawer = true
    navigations: Navigation[] = []

    @Mutation
    setDrawer(drawer: boolean) {
        this.drawer = drawer
    }

    @Mutation
    setNavigations(navigations: Navigation[]) {
        this.navigations = navigations
    }
}

export default getModule(AdminModule)
