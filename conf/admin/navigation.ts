interface Navigation {
    [rootName: string]: {
        icon: string
        sub?: string[]
    }
}

const navConf: Navigation[] = [
    {
        superadmin: {
            icon: 'mdi-home',
            sub: ['rolemanager', 'testString']
        }
    },
    {
        superadmin: {
            icon: 'mdi-lock'
        }
    }
]

export { Navigation, navConf }
