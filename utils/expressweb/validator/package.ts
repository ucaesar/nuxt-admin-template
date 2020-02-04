import validator from 'validator';

import { PackageItem } from '@/models/expressweb/Package';

/** positive float */
export function weightType(val: any) {
    const v = val === undefined ? '' : val;
    return validator.isFloat(v, { gt: 0 });
}

export function dimensionRequired(packageItem: PackageItem) {
    function notEmpty(value: any) {
        return !!value;
    }

    if (
        notEmpty(packageItem.length) &&
        notEmpty(packageItem.width) &&
        notEmpty(packageItem.height)
    ) {
        return true;
    }

    return false;
}

/** positive integer */
/* export function dimensionType(packageItem: PackageItem) {
    function gt0Int(val: any) {
        const v = val === undefined ? '' : val;
        return validator.isInt(v, { gt: 0 });
    }

    console.log(packageItem);

    if (
        gt0Int(packageItem.length) &&
        gt0Int(packageItem.width) &&
        gt0Int(packageItem.height)
    ) {
        return true;
    }

    return false;
} */
export function dimensionType(val: any) {
    const v = val === undefined ? '' : val;
    return validator.isInt(v, { gt: 0 });
}

export function dimensionSum(packageItem: PackageItem, limit: number) {
    if (packageItem.dimensionSum() > limit) return false;
    return true;
}
