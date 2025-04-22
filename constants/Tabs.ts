export type AppTab = {
    name: string;
    title: string;
    for: 'user' | 'admin' | 'member';
    }

const AppTabs: AppTab[] = [
    {
        name: 'Outils',
        title: 'les outils de la guilde',
        for: 'admin',
    },
    {
        name: 'Membres',
        title: 'les membres de la guilde',
        for: 'admin',
    },
    {
        name: 'Arbitrage',
        title: 'Arbitrage des contestations',
        for: 'admin',
    },
    {
        name: 'Règlement',
        title: 'règlement de la guilde',
        for: 'user',
    },
    {
        name: 'Options',
        title: 'options et paramètres',
        for: 'user',
    },
    {
        name: 'Déclarer',
        title: 'déclarer une nouvelle intervention',
        for: 'member',
    },
    {
        name: 'Historique',
        title: 'historique de vos interventions',
        for: 'member',
    },
    {
        name: 'Soldes',
        title: 'les membres de la guilde',
        for: 'member',
    },
    {
        name: 'Aide',
        title: "besoin d'aide ?",
        for: 'user',
    }
]

export default AppTabs;