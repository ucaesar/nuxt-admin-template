import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

export async function login(loginForm: any) {
    const url = '/api/user/login';
    const $axios = getNuxtAxiosInstance();
    let redirect: string;

    try {
        redirect = (await $axios.$post(url, loginForm)).redirect;
    } catch (e) {
        throw e;
    }

    return redirect;
}

export async function logout() {
    const url = '/api/user/logout';
    const $axios = getNuxtAxiosInstance();
    let redirect: string;

    try {
        redirect = (await $axios.$post(url)).redirect;
    } catch (e) {
        throw e;
    }

    return redirect;
}
