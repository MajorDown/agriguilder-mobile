import AppPage from '@/components/AppPage';
import { useAdminContext } from '@/contexts/adminContext';
import { StyleSheet, Text, View } from 'react-native';

const Arbitrage = () => {
    const {guildInterventions, guildContestations} = useAdminContext();

    return (<AppPage 
        adminOnly 
        title="Arbitrage des contestations"
    >
        <View>
            <Text>page pour gérer les contestations</Text>
        </View>
    </AppPage>)
}

export default Arbitrage;

const styles = StyleSheet.create({})