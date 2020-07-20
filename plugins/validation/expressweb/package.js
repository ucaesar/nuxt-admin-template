import validator from 'validator';
import { extend } from 'vee-validate';

// import { PackageItem } from '@/models/expressweb/Package';

export function fieldRequired(packageItem) {
    function notEmpty(value) {
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
export function weightType(packageItem) {
    function gt0(val) {
        const v = val === undefined ? '' : val;
        return validator.isFloat(v.toString(), { gt: 0 });
    }
    return gt0(packageItem.weight);
}

export function dimensionType(packageItem) {
    function gt0Int(val) {
        const v = val === undefined ? '' : val;
        return validator.isInt(v.toString(), { gt: 0 });
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

export function dimensionSum(packageItem, limit) {
    // const limit = 330;
    // if (packageItem.dimensionSum() > limit) return false;
    const d = [
        Number(packageItem.length),
        Number(packageItem.width),
        Number(packageItem.height)
    ];
    d.sort((x, y) => {
        return y - x;
    });

    const sum = d[0] + (d[1] + d[2]) * 2;

    return sum < limit;
}

/** add to vee-validate rules */
export function packageExtend(i18n) {
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
        params: ['limit'],
        // validate: value => dimensionSum(value),
        validate(value, { limit }) {
            return dimensionSum(value, limit);
        },
        message: i18n.t('expressweb.package.error.dimensionSum')
    });
}
