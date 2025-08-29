import { Contestation, Intervention } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { deleteDeclaration } from "@/utils/requests/forAdmin/deleteDeclaration";
import { ruleContestation } from "@/utils/requests/forAdmin/ruleContestation";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppDateInput from "../inputs/AppDateInput";
import AppNumberInput from "../inputs/AppNumberInput";
import AppSelect from "../inputs/AppSelect";
import AppTextInput from "../inputs/AppTextInput";
import AppToolSelect from "../inputs/AppToolSelect";
import AppText from "../texts/AppText";

type EditContestationFormProps = {
    contestationToEdit: Contestation; // La contestation à éditer
    visible: boolean;
    onClose: () => void;
}

type Confirmation = 'none' | 'pending' | 'confirmed';

/**
 * @description Formulaire d'édition d'une contestation
 * @param props.contestationToEdit - La contestation à éditer
 * @param props.visible - Indique si le formulaire est visible
 * @param props.onClose - Fonction à appeler pour fermer le formulaire
 * @returns 
 */
const EditContestationForm = (props: EditContestationFormProps): ReactNode => {
    const {admin, guildMembers, guildConfig, refetchAll} = useAdminContext();
    const [correctedDeclaration, setCorrectedDeclaration] = useState<Intervention>(props.contestationToEdit.contestedIntervention);
    const [adminConclusion, setAdminConclusion] = useState<"accordé" | "refusé">("accordé");
    const [adminMessage, setAdminMessage] = useState<string>(props.contestationToEdit.adminMessage || '');
    const [error, setError] = useState<string | null>(null);
    const [editConfirmation, setEditConfirmation] = useState<Confirmation>('none');
    const [deleteConfirmation, setDeleteConfirmation] = useState<Confirmation>('none');

    const handleEditContestation = async (): Promise<void> => {
        if (!props.contestationToEdit || !admin) return;
        try {
            await ruleContestation(admin, {
                ...props.contestationToEdit,
                contestedIntervention: correctedDeclaration,
                adminConclusion: adminConclusion,
                adminMessage: adminMessage
            });
            props.onClose();
            await refetchAll?.(); // Recharger les données après la modification
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue lors de la mise à jour de la contestation.");
            setEditConfirmation('none');
        }
    };

    const handleDeleteDeclaration = async (): Promise<void> => {
        if (!props.contestationToEdit || !admin) return;
        try {
            await deleteDeclaration(admin, props.contestationToEdit.contestationDate);
            props.onClose();
            await refetchAll?.();
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue lors de la suppression de la déclaration.");
            setDeleteConfirmation('none');
        }
    };

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
                    value={props.contestationToEdit.contestedIntervention.interventionDate}
                    onChange={(date) => setCorrectedDeclaration({ ...correctedDeclaration, interventionDate: date })} />
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
                <AppText>Conclusion de l’admin</AppText>
                <AppSelect
                    options={[
                        { label: "Accorder la contestation", value: "accordé" },
                        { label: "Refuser la contestation", value: "refusé" }
                    ]}
                    defaultValue={{
                        label: adminConclusion === "accordé" ? "Accorder la contestation" : "Refuser la contestation",
                        value: adminConclusion
                    }}
                    onSelect={(value: string | number) => setAdminConclusion(value as "accordé" | "refusé")}
                />
                <AppText>Message pour le contesteur (optionnel)</AppText>
                <AppTextInput
                    placeholder="Votre message"
                    value={adminMessage}
                    onChange={(text) => setAdminMessage(text)}
                />
            </View>
            <View style={styles.buttons}>
                {editConfirmation === 'none' &&
                    <AppButton
                        type="light"
                        text={"modifier"}
                        onPress={() => setEditConfirmation('pending')}
                    />
                }
                {editConfirmation === 'pending' && <>
                    <AppText>/!\\ vérifiez vos modification avant de confirmer</AppText>
                    <AppButton
                        type="light"
                        text={"Confirmer"}
                        onPress={() => handleEditContestation()}
                    />
                </>}
                <AppButton
                    type={'green'}
                    text={'Annuler'}
                    onPress={() => props.onClose()}
                />              
                {deleteConfirmation === 'none' &&
                    <AppButton
                        type="light"
                        text={"supprimer la déclaration"}
                        onPress={() => setDeleteConfirmation('pending')}
                    />
                }
                {deleteConfirmation === 'pending' && <>
                    <AppText> /!\\ Êtes-vous sur de vouloir supprimer cette déclaration ?</AppText>
                    <AppButton
                        type="light"
                        text={"confirmer la suppression"}
                        onPress={() => handleDeleteDeclaration()}
                    />
                </>}
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 10
    }
});