export const state = () => ({
    locale: 'cn'
})

export const mutations = {
    SET_LOCALE(state, locale) {
        console.log(locale)
        state.locale = locale
    }
}

export const actions = {
    nuxtServerInit() {
        console.log("This is the entry!")
    }
}