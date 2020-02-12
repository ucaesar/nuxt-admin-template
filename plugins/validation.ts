import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import validator from 'validator';

import { registerExtend } from './validation/register';
import { packageExtend } from './validation/expressweb/package';

export default ({ app }) => {
    const i18n = app.i18n;

    extend('required', {
        ...required,
        message: i18n.t('formValidating.error.fieldRequired')
    });

    extend('gt0', {
        validate: v => validator.isFloat(v, { gt: 0 }),
        message: i18n.t('formValidating.error.gt0')
    });

    registerExtend(i18n);
    packageExtend(i18n);
};
