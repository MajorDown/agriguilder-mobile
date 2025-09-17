import AppPage from '@/components/AppPage';
import AppButton from '@/components/buttons/AppButton';
import CreateAdminForm from '@/components/forms/CreateAdminForm';
import UpdatePassword from '@/components/forms/UpdatePasswordForm';
import { useAdminContext } from '@/contexts/adminContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        <View style={styles.container}>
            <AppButton type='light' text="modifier le mot de passe" onPress={() => { setSelectedOption('setPassword') }} />
            <AppButton type='light' text="Créer un nouvel admin" onPress={() => { setSelectedOption('createAdmin') }} />
            <AppButton type='light' text="Réinitialiser les compteurs" onPress={() => { setSelectedOption('resetCounters') }} />
            <AppButton type='green' text="se déconnecter" onPress={handleLogout} />
        </View>
        {selectedOption === 'setPassword' && <UpdatePassword visible={selectedOption === 'setPassword'} onClose={() => setSelectedOption(null)} />}
        {selectedOption === 'createAdmin' && <CreateAdminForm visible={selectedOption === 'createAdmin'} onClose={() => setSelectedOption(null)} />}
        {selectedOption === 'resetCounters' && <Text>Réinitialiser les compteurs</Text>}
    </AppPage>)
}

export default Options;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
    },
});
