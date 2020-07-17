import validator from 'validator';
import { extend } from 'vee-validate';

import { IProvince } from '@/models/expressweb/zone';
import { provinces } from '@/conf/expressweb/provinces';

export function provinceCode(province: IProvince | string) {
    console.log('typeof province, ', typeof province);
    if (typeof province === 'string') return false;

    for (const p of provinces[province.countryCode]) {
        console.log('p! ', p);
        if (p.code === province.code) return true;
    }
    return false;
}

export function addressExtend(i18n: any) {
    extend('address.provinceCode', {
        validate: value => provinceCode(value),
        message: i18n.t('expressweb.address.error.provinceCode')
    });
}
