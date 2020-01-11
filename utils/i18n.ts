import { getI18n } from './NuxtOptions';

/**
 * Add locale prefix before path
 */
export function computeLocalePath(path: string) {
    const i18n = getI18n() as any;
    const absolutePath = path[0] === '/' ? path : '/' + path;
    return i18n.defaultLocale === i18n.locale
        ? absolutePath
        : `/${i18n.locale}` + absolutePath;
}
