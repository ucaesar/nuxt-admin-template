import { $t } from '@/utils/t';

type fieldValidator = (value: any) => boolean | string;

const fieldRequired: fieldValidator = value => {
    return !!value || $t('formValidating.error.fieldRequired');
};

export { fieldRequired };
