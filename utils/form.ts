import { $t } from '@/utils/NuxtOptions';
import { Vue } from 'nuxt-property-decorator';

type fieldValidator = (value: any) => boolean | string;

export const fieldRequired: fieldValidator = value => {
    return !!value || $t('formValidating.error.fieldRequired');
};

export type VForm = Vue & { validate: () => boolean };
