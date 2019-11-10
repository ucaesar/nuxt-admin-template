interface Navigation {
    [rootName: string]: {
        icon: string;
        sub?: string[];
    };
}

const navConf: Navigation[] = [
    {
        superadmin: {
            icon: 'mdi-home',
            sub: ['resourcegroup','resource', 'role']
        }
    },
    {
        superadmin: {
            icon: 'mdi-lock'
        }
    }
];

export { Navigation, navConf };
