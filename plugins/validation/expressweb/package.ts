import validator from 'validator';
import { extend } from 'vee-validate';

import { PackageItem } from '@/models/expressweb/Package';

export function fieldRequired(packageItem: PackageItem) {
    function notEmpty(value: any) {
        return !!value;
    }

    if (
        notEmpty(packageItem.weight) &&
        notEmpty(packageItem.length) &&
        notEmpty(packageItem.width) &&
        notEmpty(packageItem.height)
    ) {
        return true;
    }

    return false;
}

/** positive float */
export function weightType(packageItem: PackageItem) {
    function gt0(val: any) {
        const v = val === undefined ? '' : val;
        return validator.isFloat(v, { gt: 0 });
    }
    return gt0(packageItem.weight);
}

export function dimensionType(packageItem: PackageItem) {
    function gt0Int(val: any) {
        const v = val === undefined ? '' : val;
        return validator.isInt(v, { gt: 0 });
    }

    if (
        gt0Int(packageItem.length) &&
        gt0Int(packageItem.width) &&
        gt0Int(packageItem.height)
    ) {
        return true;
    }

    return false;
}

export function dimensionSum(packageItem: PackageItem) {
    const limit = 330;
    if (packageItem.dimensionSum() > limit) return false;
    return true;
}

/** add to vee-validate rules */
export function packageExtend(i18n: any) {
    extend('package.required', {
        validate: value => {
            return { valid: fieldRequired(value), required: true };
        },
        computesRequired: true,
        message: i18n.t('expressweb.package.error.required')
    });

    extend('package.weightType', {
        validate: value => weightType(value),
        message: i18n.t('expressweb.package.error.weightType')
    });

    extend('package.dimensionType', {
        validate: value => dimensionType(value),
        message: i18n.t('expressweb.package.error.dimensionType')
    });

    extend('package.dimensionSum', {
        validate: value => dimensionSum(value),
        message: i18n.t('expressweb.package.error.dimensionSum')
    });
}
