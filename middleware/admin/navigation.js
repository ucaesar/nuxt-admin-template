const consola = require('consola')

export default function ({ store }) {
    consola.info('middleware: navigation.js')

    const navigations = [
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

    store.commit('admin/SET_NAVIGATIONS', navigations)
}
