export const state = () => ({
    navigation: [
        { title: "Test", path: "/", icon: "mdi-home" },
        {
            title: "Test1",
            icon: "mdi-home",
            sub: [
                { title: "Home", path: "/" },
                { title: "Inspire", path: "/inspire" }
            ]
        },
        {
            title: "Test1",
            icon: "mdi-home",
            sub: [
                { title: "Home", path: "/" },
                { title: "Inspire", path: "/inspire" }
            ]
        }
    ]
})

export const mutations = {
    SET_NAVIGATION(state, navigation) {
        state.navigation = navigation;
    }
}

export const actions = {
}
