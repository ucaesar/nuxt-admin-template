import { Vue } from 'nuxt-property-decorator';
import { $t } from '@/utils/NuxtOptions';

export const fieldRequired = (value: any) => {
    return !!value || $t('formValidating.error.fieldRequired');
};

export type VForm = Vue & {
    validate: () => boolean;
    resetValidation: () => void;
};
