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
