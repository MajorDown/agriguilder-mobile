import AppPage from '@/components/AppPage';
import ContestationLister from '@/components/lists/ContestationLister';
import { useAdminContext } from '@/contexts/adminContext';
import { StyleSheet } from 'react-native';

const Arbitrage = () => {
    const {guildInterventions, guildContestations} = useAdminContext();

    return (<AppPage 
        adminOnly 
        title="Arbitrage des contestations"
    >
        <ContestationLister onEdit={(editedContestation) => {
            // Handle the edit action here
        }} />
    </AppPage>)
}

export default Arbitrage;

const styles = StyleSheet.create({})