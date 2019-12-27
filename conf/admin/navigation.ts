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
            sub: ['resource','resourcegroup', 'role', 'user']
        }
    }
];

export { Navigation, navConf };
