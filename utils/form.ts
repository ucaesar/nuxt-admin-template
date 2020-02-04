import { Vue } from 'nuxt-property-decorator';
import { $t } from '@/utils/NuxtOptions';

export const fieldRequired = (value: any) => {
    return !!value || $t('formValidating.error.fieldRequired');
};

export type VForm = Vue & {
    reset: () => void;
    validate: () => boolean;
    resetValidation: () => void;
};

export type VCustomInput = Vue & {
    checkValid: () => boolean;
};
