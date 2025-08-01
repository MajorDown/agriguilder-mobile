import AppPage from '@/components/AppPage';
import EditContestationForm from '@/components/forms/EditContestationForm';
import ContestationLister from '@/components/lists/ContestationLister';
import { Contestation } from '@/constants/Types';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const Arbitrage = () => {
    const [wantEditContestation, setWantEditContestation] = useState<boolean>(false);
    const [contestationToEdit, setContestationToEdit] = useState<Contestation | null>(null);

    const handleEditContestation = (contestation: Contestation) => {
        setContestationToEdit(contestation);
        setWantEditContestation(true);
    }

    return (<AppPage 
        title="Arbitrage des contestations"
        adminOnly 
    >
        <ContestationLister onEdit={handleEditContestation} />
        {wantEditContestation && contestationToEdit !== null && (
            <EditContestationForm
                contestationToEdit={contestationToEdit}
                visible={wantEditContestation}
                onClose={() => setWantEditContestation(false)}
            />
        )}
    </AppPage>)
}

export default Arbitrage;

const styles = StyleSheet.create({})