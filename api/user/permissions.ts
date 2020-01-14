import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

export async function permissions(): Promise<string[]> {
    const url = '/api/user/permissions';
    const $axios = getNuxtAxiosInstance();

    try {
        const data = await $axios.$get(url);
        return data;
    } catch (e) {
        throw e;
    }
}
