import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppNumberInput from "../inputs/AppNumberInput";
import AppTextInput from "../inputs/AppTextInput";
import AppText from "../texts/AppText";

type CreateMemberFormProps = {
    visible: boolean;
    onClose: () => void;
}

const CreateMemberForm = (props: CreateMemberFormProps): ReactNode => {
    const {admin} = useAdminContext();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async (): Promise<void> => {
        try {
        } catch (error) {
            setError("Erreur lors de la création du membre");
            console.error("Erreur lors de la suppression du membre:", error);
        }
    }

    return (<AppModal
        title={`Création d'un nouveau membre`}
        visible={props.visible}
        onClose={() => { props.onClose() }}
    >
        <View style={styles.form}>
            <View>
                <AppTextInput
                    label="son prénom"
                    placeholder="Prénom du membre"
                    value={firstName}
                    onChange={setFirstName}
                />
                <AppTextInput
                    label="son nom de famille"
                    placeholder="Nom de famille du membre"
                    value={lastName}
                    onChange={setLastName}
                />
                <AppTextInput
                    label="son email"
                    placeholder="Email du membre"
                    value={email}
                    onChange={setEmail}
                />
                <AppNumberInput
                    label="son téléphone"
                    placeholder="Téléphone du membre"
                    value={phone === null ? undefined : phone}
                    onChange={setPhone}
                />
            </View>
            <View style={styles.buttons}>
                <AppButton
                    type="light"
                    text={"Créer"}
                    onPress={() => handleCreate()}
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

export default CreateMemberForm;

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