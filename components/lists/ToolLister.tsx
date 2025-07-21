import ToolCard from "@/components/cards/ToolCard";
import { Tool } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../texts/AppText";

type ToolListerProps = {
    onToolEdit: (tool: Tool) => void;
    onDeleteTool?: (tool: Tool) => void; // Fonction pour supprimer un outil
    onSelectedToolsChange?: (selectedTools: Tool[]) => void;
    mode: 'edit' | 'select';
}

/**
 * @description Composant pour lister les outils de la guilde.
 * @params {function} onToolEdit - Fonction appelée lors de la modification d'un outil.
 * @param {function} onSelectedToolsChange - Fonction appelée lors de la sélection des outils.
 * @param {string} mode - 'select' ou 'edit'.
 */
const ToolLister = (props: ToolListerProps): ReactNode => {
    const { guildConfig } = useAdminContext();
    const [selectedTools, setSelectedTools] = useState<Tool[]>([]) // Si vous avez besoin de gérer la sélection des outils

    const handleToolSelection = (tool: Tool, isSelected: boolean) => {
        if (isSelected) {
            // Ajouter l'outil s'il n'est pas déjà sélectionné
            setSelectedTools(prev => {
                if (!prev.some(selectedTool => selectedTool.option === tool.option)) {
                    const newSelectedTools = [...prev, tool];
                    props.onSelectedToolsChange?.(newSelectedTools);
                    return newSelectedTools;
                }
                return prev;
            });
        } else {
            // Retirer l'outil de la sélection
            setSelectedTools(prev => {
                const newSelectedTools = prev.filter(selectedTool => selectedTool.option !== tool.option);
                props.onSelectedToolsChange?.(newSelectedTools);
                return newSelectedTools;
            });
        }
    };

    return (<View style={style.container}>
        {props.mode === 'select' && selectedTools.length > 0 && <AppText>{`(${selectedTools.length} outil(s) sélectionné(s))`}</AppText>}
        {guildConfig?.config.map((tool) => (
            <ToolCard 
                key={tool.option} 
                tool={tool} 
                onPress={(tool) => props.onToolEdit(tool)}
                mode={props.mode}
                onSelect={(isSelected) => handleToolSelection(tool, isSelected)}
                onDelete={() => props.onDeleteTool?.(tool)}
            />
        ))}
    </View>)
}

export default ToolLister;

const style = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
        gap: 10

    }
})