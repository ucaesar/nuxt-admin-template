export interface Navigation {
    [rootName: string]: {
        icon: string;
        sub?: string[];
    };
}

export const navConf: Navigation[] = [
    {
        superadmin: {
            icon: 'mdi-home',
            sub: ['resource','resourcegroup', 'role', 'user']
        }
    }
];
