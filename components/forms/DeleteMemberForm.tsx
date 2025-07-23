import { Member } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import deleteMember from "@/utils/requests/forAdmin/deleteMember";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppText from "../texts/AppText";

type DeleteMemberFormProps = {
    memberToDelete: Member;
    visible: boolean;
    onClose: () => void;
}

const DeleteMemberForm = (props: DeleteMemberFormProps): ReactNode => {
    const {admin, guildMembers, updateGuildMembers} = useAdminContext();
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (): Promise<void> => {
        try {
            const newMembersList = guildMembers?.filter(member => member.mail !== props.memberToDelete.mail);
            if (!guildMembers || !guildMembers.length) {
                setError("Liste des membres introuvable");
                throw new Error("Liste des membres introuvable");
            }
            if (!admin) {
                setError("Admin introuvable");
                throw new Error("Admin introuvable");
            }

            const response = await deleteMember(props.memberToDelete.mail, admin);
            if (response.ok) {
                updateGuildMembers(newMembersList ?? []);
                props.onClose();
            } else {
                console.error("Failed to delete member:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du membre:", error);
        }
    }

    return (<AppModal
        title={`Suppression du membre '${props.memberToDelete.name}'`}
        visible={props.visible}
        onClose={() => { props.onClose() }}
    >
        <View style={styles.form}>

            <View style={styles.confirmations}>
                <AppText>Êtes-vous sur de vouloir supprimer ce membre ? Cette action est irreversible.</AppText>
            </View>
            <View style={styles.buttons}>
                <AppButton 
                    type="light" 
                    text={"Supprimer"}
                    onPress={() => handleDelete()}
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

export default DeleteMemberForm;

const styles = StyleSheet.create({
    form: {
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
})