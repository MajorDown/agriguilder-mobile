import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppText from "../texts/AppText";

type EditContestationFormProps = {
    visible: boolean;
    onClose: () => void;
}

const EditContestationForm = (props: EditContestationFormProps): ReactNode => {
    const {admin, guildMembers, updateGuildMembers} = useAdminContext();
    const [error, setError] = useState<string | null>(null);

    const handleEditContestation = async (): Promise<void> => {}
    
    return (<AppModal
        title={`Création d'un nouveau membre`}
        visible={props.visible}
        onClose={() => { props.onClose() }}
    >
        <View style={styles.form}>
            <View style={styles.inputs}>

            </View>
            <View style={styles.buttons}>
                <AppButton
                    type="light"
                    text={"Créer"}
                    onPress={() => handleEditContestation()}
                />
                <AppButton
                    type={'green'}
                    text={'Annuler'}
                    onPress={() => props.onClose()}
                />              
            </View>
            {error && <AppText type={"error"}>{error}</AppText>}
        </View>         
    </AppModal>)
}

export default EditContestationForm;

const styles = StyleSheet.create({
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    inputs: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    confirmations: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});