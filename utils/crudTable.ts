import { Vue } from 'nuxt-property-decorator';

export type CrudTableComponent = Vue & {
    loadingOverlay: () => void;
    submittingOverlay: () => void;
    unOverlay: () => void;
    loadPage: () => void;
    resetPagination: () => void;
};
