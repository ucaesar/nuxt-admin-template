import { Vue } from 'nuxt-property-decorator';

export type CrudTableComponent = Vue & {
    reset: () => void;
    loadingOverlay: () => void;
    unOverlay: () => void;
};
