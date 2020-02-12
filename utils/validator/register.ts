import { extend } from 'vee-validate';
import validator from 'validator';

export function isEmail(value: any) {
    return validator.isEmail(value);
}

/** aplha and numeric */
export function usernameType(value: any) {
    return validator.isAlphanumeric(value);
}

/** between 5 ~ 20 */
export function usernameLength(value: any) {
    return validator.isLength(value, { min: 5, max: 20 });
}

/** ascii */
export function passwordType(value: any) {
    return validator.isAscii(value);
}

/** between 8 ~ 20 */
export function passwordLength(value: any) {
    return validator.isLength(value, { min: 8, max: 20 });
}

export function registerExtend($t: any) {
    extend('emailFormatt', {
        validate: value => isEmail(value),
        message: $t('register.error.emailFormatt')
    });

    extend('register.usernameType', {
        validate: value => usernameType(value),
        message: $t('register.error.usernameType')
    });

    extend('register.usernameLength', {
        validate: value => usernameLength(value),
        /* validate: value =>
            min.validate(value, { length: 5 }) &&
            max.validate(value, { length: 20 }), */
        message: $t('register.error.usernameLength')
    });

    extend('register.passwordType', {
        validate: value => passwordType(value),
        message: $t('register.error.passwordType')
    });
}
