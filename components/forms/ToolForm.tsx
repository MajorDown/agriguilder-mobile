import Colors from "@/constants/AppColors";
import { Tool } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import EditGuildConfig from "@/utils/requests/forAdmin/updateGuildConfig";
import { ReactNode, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import AppModal from "../AppModal";
import AppButton from "../buttons/AppButton";
import AppNumberInput from "../inputs/AppNumberInput";
import AppTextInput from "../inputs/AppTextInput";
import AppText from "../texts/AppText";

type ToolFormProps = {
    initialTool: Tool
    visible: boolean;
    onClose: () => void;
}

/**
 * @description Formulaire pour créer ou modifier un outil de la guilde.
 */
const ToolForm = (props: ToolFormProps): ReactNode => {
    const {admin, guildConfig, updateGuildConfig} = useAdminContext();
    const [toolToEdit, setToolToEdit] = useState<Tool>(props.initialTool);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (): Promise<void> => {
        if (!toolToEdit.option) {
            setError("Le nom de l'outil est requis.");
            return;
        }
        if (toolToEdit.coef <= 0) {
            setError("Le coefficient de l'outil doit être supérieur à 0.");
            return;
        }
        setError(null);

        if (!admin || !guildConfig) {
            console.error("Données manquantes pour l'update (admin ou guildConfig).");
            return;
        }

        // Création d'un nouveau tableau mis à jour
        const updatedTools = guildConfig.config.filter(tool => tool.option !== toolToEdit.option);
        updatedTools.push(toolToEdit); // ajout/modif de l'outil

        const updatedConfig = {
            ...guildConfig,
            config: updatedTools,
        };

        try {
            const response = await EditGuildConfig(admin, updatedConfig);
            if (response.ok) {
                updateGuildConfig(updatedConfig);
                props.onClose();
            }
        } catch (err) {
            console.error("Failed to update guild config:", err);
            setError("Une erreur est survenue lors de la mise à jour de l'outil. Veuillez réessayer plus tard.");
        }
    };

    return (<AppModal 
        title={props.initialTool.option? `Modifier l'outil '${props.initialTool.option}'` : 'Créer un nouvel outil'} 
        visible={props.visible} 
        onClose={() => {props.onClose()}}
    >
        <View style={style.form}>
            <AppTextInput 
                label={"Nom de l'outil :"} 
                value={toolToEdit.option} onChange={(text) => setToolToEdit({ ...toolToEdit, option: text })}
                placeholder={"Nom de l'outil"}
                required
            />
            <AppNumberInput
                label={"Coefficient de l'outil :"}
                value={toolToEdit.coef}
                onChange={(value) => setToolToEdit({ ...toolToEdit, coef: value || 0 })}
                allowDecimal
                required
            />
            <View style={style.switchLine}>
                <AppText>Activer l'outil ?</AppText>
                <Switch
                    value={toolToEdit.enabled}
                    onValueChange={(value) => setToolToEdit({ ...toolToEdit, enabled: value })}
                    trackColor={{ false: Colors.light, true: Colors.light }}
                    thumbColor={toolToEdit.enabled ? Colors.ok : Colors.error}
                />
            </View>
            <View style={style.buttons}>
                <AppButton 
                    type="light" 
                    text={props.initialTool ? "Modifier l'outil" : "Créer l'outil"}
                    onPress={() => handleSubmit()}
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

export default ToolForm;

const style = StyleSheet.create({
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    switchLine: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    }
})