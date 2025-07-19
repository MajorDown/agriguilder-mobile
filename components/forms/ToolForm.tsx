import { Tool } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
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

const ToolForm = (props: ToolFormProps): ReactNode => {
    const {guildConfig, updateGuildConfig} = useAdminContext();
    const [toolToEdit, setToolToEdit] = useState<Tool>(props.initialTool);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (): Promise<void> => {
        if (!toolToEdit.option) setError("Le nom de l'outil est requis.");
    }

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
                onChange={(value) => setToolToEdit({ ...toolToEdit, coef: value || 1 })}
                required
                allowDecimal
            />
            <AppButton 
                type="light" 
                text={props.initialTool ? "Modifier l'outil" : "Créer l'outil"}
                onPress={() => handleSubmit()}
            />
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
})