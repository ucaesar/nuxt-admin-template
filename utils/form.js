import $t from '@/utils/t'

export const fieldRequired = value => {
    return !!value || $t('formValidating.error.fieldRequired')
}
