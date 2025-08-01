import { Contestation, Intervention } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppDateInput from "../inputs/AppDateInput";
import AppNumberInput from "../inputs/AppNumberInput";
import AppSelect from "../inputs/AppSelect";
import AppToolSelect from "../inputs/AppToolSelect";
import AppText from "../texts/AppText";

type EditContestationFormProps = {
    contestationToEdit: Contestation; // La contestation à éditer
    visible: boolean;
    onClose: () => void;
}

const EditContestationForm = (props: EditContestationFormProps): ReactNode => {
    const {admin, guildMembers, guildConfig, updateGuildMembers} = useAdminContext();
    const [correctedDeclaration, setCorrectedDeclaration] = useState<Intervention>(props.contestationToEdit.contestedIntervention);
    const [error, setError] = useState<string | null>(null);

    const handleEditContestation = async (): Promise<void> => {
        if (!props.contestationToEdit) return;

        try {
            props.onClose();
        } catch (err) {
            setError("Une erreur est survenue lors de la mise à jour de la contestation.");
        }
    }

    return (<AppModal
        title={`Contestation de ${props.contestationToEdit.contester} concernant la déclaration ${props.contestationToEdit.contestedIntervention.declarationDate}`}
        visible={props.visible}
        onClose={() => { props.onClose() }}
    >
        <AppText>Motif : "{props.contestationToEdit.contesterMessage}"</AppText>
        <AppText>Veuillez vérifier / rectifier l'intervention initialement déclarée par {props.contestationToEdit.contestedIntervention.worker} :</AppText>
        <View style={styles.form}>
            <View style={styles.inputs}>
                <AppDateInput
                    label="Date de l'intervention"
                    value={props.contestationToEdit.contestationDate}
                    onChange={(date) => setCorrectedDeclaration({ ...correctedDeclaration, declarationDate: date })}
                />
                <AppText>Bénéficiaire de l'intervention</AppText>
                {guildMembers &&<AppSelect
                    options={guildMembers.map(member => ({ label: member.name, value: member.name }))}
                    defaultValue={{label: correctedDeclaration.worker, value: correctedDeclaration.worker}}
                    onSelect={(value: string | number) => setCorrectedDeclaration({ ...correctedDeclaration, worker: String(value) })}
                />}
                <AppNumberInput
                    label="Nombre d'heure déclarées"
                    value={correctedDeclaration.hours}
                    onChange={(value: number | null) => setCorrectedDeclaration({ ...correctedDeclaration, hours: value ?? 0 })}
                />
                <AppToolSelect
                    guildOptions={guildConfig?.config ?? []}
                    initialSelectedOptions={correctedDeclaration.options.map(option =>
                        typeof option === "string" ? option : option.option
                    )}
                    selectedOptions={(selected) => setCorrectedDeclaration({ ...correctedDeclaration, options: selected })}
                />
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