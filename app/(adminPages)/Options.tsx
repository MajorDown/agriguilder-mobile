import AppPage from '@/components/AppPage';
import AppButton from '@/components/buttons/AppButton';
import { useAdminContext } from '@/contexts/adminContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

type Options = null | 'setPassword' | 'createAdmin' | 'resetCounters';

const Options = () => {
    const {updateAdmin} = useAdminContext();
    const [selectedOption, setSelectedOption] = useState<Options>(null);
    const router = useRouter();

    const handleLogout = () => {
        updateAdmin(null);
        router.replace('/login');
    }

    return (<AppPage adminOnly title="Options et paramètres">
        <AppButton type='light' text="modifier le mot de passe" onPress={() => { setSelectedOption('setPassword') }} />
        <AppButton type='light' text="Créer un nouvel admin" onPress={() => { setSelectedOption('createAdmin') }} />
        <AppButton type='light' text="Réinitialiser les compteurs" onPress={() => { setSelectedOption('resetCounters') }} />
        <AppButton type='green' text="se déconnecter" onPress={handleLogout} />
        {selectedOption === 'setPassword' && <Text>Modifier le mot de passe</Text>}
        {selectedOption === 'createAdmin' && <Text>Créer un nouvel admin</Text>}
        {selectedOption === 'resetCounters' && <Text>Réinitialiser les compteurs</Text>}
    </AppPage>)
}

export default Options;