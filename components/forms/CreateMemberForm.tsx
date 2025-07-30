import { NewMemberInfos } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import createMember from "@/utils/requests/forAdmin/createMember";
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
    const {admin, guildMembers, updateGuildMembers} = useAdminContext();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<number | null>(null);
    const [initialCount, setInitialCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async (): Promise<void> => {
        try {
            if (!admin) throw new Error("Admin context is not available");
            const newMemberInfos: NewMemberInfos = {
                name: firstName + ' ' + lastName,
                mail: email,
                phone: phone?.toString() || '',
                initialCount : initialCount,
                guild: admin?.guild || '',
            };
            const data = await createMember(newMemberInfos, admin);
            updateGuildMembers?.([...(guildMembers || []), data]);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone(null);
            setInitialCount(0);
            setError(null);
            props.onClose();
        } catch (error) {
            setError("Erreur lors de la création du membre");
        }
    }

    return (<AppModal
        title={`Création d'un nouveau membre`}
        visible={props.visible}
        onClose={() => { props.onClose() }}
    >
        <View style={styles.form}>
            <View style={styles.inputs}>
                <AppTextInput
                    label="son prénom"
                    placeholder="Prénom du membre"
                    value={firstName}
                    onChange={setFirstName}
                    required
                />
                <AppTextInput
                    label="son nom de famille"
                    placeholder="Nom de famille du membre"
                    value={lastName}
                    onChange={setLastName}
                    required
                />
                <AppTextInput
                    label="son email"
                    placeholder="Email du membre"
                    value={email}
                    onChange={setEmail}
                    required
                />
                <AppNumberInput
                    label="son téléphone"
                    placeholder="Téléphone du membre"
                    value={phone === null ? undefined : phone}
                    onChange={setPhone}
                    required
                />
                <AppNumberInput
                    label="la valeur initiale de son solde (0 par défaut)"
                    placeholder="Nombre initial du membre"
                    value={initialCount === null ? undefined : initialCount}
                    onChange={(value) => setInitialCount(value || 0)}
                    allowDecimal
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
})