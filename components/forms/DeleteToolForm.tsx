import { Tool } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import EditGuildConfig from "@/utils/requests/forAdmin/updateGuildConfig";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppText from "../texts/AppText";

type DeleteToolFormProps = {
    toolToDelete: Tool;
    visible: boolean;
    onClose: () => void;
}

/**
 * @description Formulaire de suppression d'un outil
 * @param props.toolToDelete - L'outil à supprimer
 * @param props.visible - Indique si le formulaire est visible
 * @param props.onClose - Fonction à appeler pour fermer le formulaire
 * @returns 
 */
const DeleteToolForm = (props: DeleteToolFormProps): ReactNode => {
    const {admin, guildConfig, updateGuildConfig} = useAdminContext();
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (): Promise<void> => {
        try {
            const newConfigList = guildConfig?.config.filter(tool => tool.option !== props.toolToDelete.option);
            if (!guildConfig || !guildConfig.name) {
                setError("nom de l'outil introuvable");
                throw new Error("nom de l'outil introuvable");
            }
            if (!admin) {
                setError("Admin introuvable");
                throw new Error("Admin introuvable");
            }
            const updatedConfig = {
                ...guildConfig,
                name: guildConfig.name, // Ensure name is present and not undefined
                config: newConfigList ?? [],
            };
            const response = await EditGuildConfig(admin, updatedConfig);
            if (response.ok) {
                updateGuildConfig(updatedConfig);
                props.onClose();
            } else {
                console.error("Failed to delete tool:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'outil:", error);
        }
    }

    return (<AppModal 
        title={`Suppression de l'outil '${props.toolToDelete.option}'`}
        visible={props.visible} 
        onClose={() => {props.onClose()}}
    >
        <View style={styles.form}>

            <View style={styles.confirmations}>
                <AppText>Êtes-vous sur de vouloir supprimer cet outil ? Cette action est irreversible.</AppText>
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

export default DeleteToolForm;

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