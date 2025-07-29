import Colors from "@/constants/AppColors";
import { Contestation } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import ContestationCard from "../cards/ContestationCard";
import AppText from "../texts/AppText";

type ContestationListerProps = {
    onEdit: (contestation: Contestation) => void
}

const ContestationLister = (props: ContestationListerProps) => {
    const { guildContestations } = useAdminContext();
    const [wantResolvedContestations, setWantResolvedContestations] = useState<boolean>(true);
    const [filteredContestations, setFilteredContestations] = useState<Contestation[]>(guildContestations || []);

    useEffect(() => {
        const filtered: Contestation[] = (guildContestations ?? []).filter(contestation => {
            if (wantResolvedContestations) {
                return contestation.adminConclusion  === 'en attente';
            }
            return true;
        });
        setFilteredContestations(filtered);
    }, [guildContestations, wantResolvedContestations]);

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Switch
                    value={wantResolvedContestations}
                    onValueChange={(value) => setWantResolvedContestations(value)}
                    trackColor={{ false: Colors.light, true: Colors.light }}
                    thumbColor={wantResolvedContestations ? Colors.ok : Colors.error}
                />
                <AppText>Masquer les Contestations déjà résolues</AppText>
            </View>
            {filteredContestations && filteredContestations.map((contestation) => (
                <ContestationCard
                    key={contestation.contestationDate}
                    contestation={contestation}
                    onEdit={(editedContestation) => props.onEdit(editedContestation)}
                />
            ))}
        </View>
    );
}

export default ContestationLister;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        gap: 10
    },
    switchContainer: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});