import { INavigation } from '@/models/admin/layout';

export const navConf: INavigation[] = [
    {
        superadmin: {
            icon: 'mdi-home',
            sub: ['resource', 'resourcegroup', 'role', 'user']
        }
    }
];
