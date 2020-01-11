import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

export async function register(registerForm: any) {
    const url = '/api/user/register';
    const $axios = getNuxtAxiosInstance();

    try {
        await $axios.$post(url, registerForm);
    } catch (e) {
        throw e;
    }
}
