import AppPage from '@/components/AppPage';
import ContestationCard from '@/components/cards/ContestationCard';
import { useAdminContext } from '@/contexts/adminContext';
import { StyleSheet, View } from 'react-native';

const Arbitrage = () => {
    const {guildInterventions, guildContestations} = useAdminContext();

    return (<AppPage 
        adminOnly 
        title="Arbitrage des contestations"
    >
        <View>
            {guildContestations && guildContestations.map((contestation) => (
                <ContestationCard key={contestation.contestationDate} contestation={contestation} />
            ))}
        </View>
    </AppPage>)
}

export default Arbitrage;

const styles = StyleSheet.create({})