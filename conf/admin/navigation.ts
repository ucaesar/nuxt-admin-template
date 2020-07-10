import { INavigation } from '@/models/admin/layout';

export const navConf: INavigation[] = [
    {
        superadmin: {
            icon: 'mdi-home',
            sub: ['resource', 'resourcegroup', 'role', 'user']
        }
    },
    {
        shipment: {
            icon: 'mdi-truck'
        }
    },
    {
        calculator: {
            icon: 'mdi-calculator'
        }
    },
    {
        account: {
            icon: 'mdi-account',
            sub: ['shipment']
        }
    }
];
