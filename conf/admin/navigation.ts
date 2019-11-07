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
            sub: ['resourcemanager', 'rolemanager']
        }
    },
    {
        superadmin: {
            icon: 'mdi-lock'
        }
    }
];

export { Navigation, navConf };
