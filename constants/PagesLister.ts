import { ImageSourcePropType } from "react-native";

export type AppTab = {
    name: string;
    title: string;
    for: 'user' | 'admin' | 'member';
    active: ImageSourcePropType,
    inactive: ImageSourcePropType
    }

const AppTabs: AppTab[] = [
    {
        name: 'Outils',
        title: 'les outils de la guilde',
        for: 'admin',
        active: require('@/assets/images/icons/declarer-green.png'),
        inactive: require('@/assets/images/icons/declarer-white-light.png')
    },
    {
        name: 'Membres',
        title: 'les membres de la guilde',
        for: 'admin',
        active: require('@/assets/images/icons/membres-green.png'),
        inactive: require('@/assets/images/icons/membres-white-light.png')
    },
    {
        name: 'Arbitrage',
        title: 'Arbitrage des contestations',
        for: 'admin',
        active: require('@/assets/images/icons/arbitrage-green.png'),
        inactive: require('@/assets/images/icons/arbitrage-white-light.png')
    },
    {
        name: 'Règlement',
        title: 'règlement de la guilde',
        for: 'user',
        active: require('@/assets/images/icons/reglement-green.png'),
        inactive: require('@/assets/images/icons/reglement-white-light.png')
    },
    {
        name: 'Options',
        title: 'options et paramètres',
        for: 'user',
        active: require('@/assets/images/icons/options-green.png'),
        inactive: require('@/assets/images/icons/options-white-light.png')
    },
    {
        name: 'Déclarer',
        title: 'déclarer une nouvelle intervention',
        for: 'member',
        active: require('@/assets/images/icons/declarer-green.png'),
        inactive: require('@/assets/images/icons/declarer-white-light.png')
    },
    {
        name: 'Historique',
        title: 'historique de vos interventions',
        for: 'member',
        active: require('@/assets/images/icons/historique-green.png'),
        inactive: require('@/assets/images/icons/historique-white-light.png')
    },
    {
        name: 'Soldes',
        title: 'les membres de la guilde',
        for: 'member',
        active: require('@/assets/images/icons/guilde-green.png'),
        inactive: require('@/assets/images/icons/guilde-white-light.png')
    }
]

export default AppTabs;