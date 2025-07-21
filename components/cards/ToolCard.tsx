import AppColors from "@/constants/AppColors";
import { Tool } from "@/constants/Types";
import { ReactNode, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type ToolCardProps = {
    tool: Tool
    onPress: (tool: Tool) => void
    mode: 'edit' | 'select'; // 'edit' pour modifier, 'view' pour visualiser
    onSelect: (isSelected: boolean) => void; // Indique si l'outil est sélectionné
    onDelete?: () => void; 
}

/**
 * @description Composant pour afficher une carte d'outil de la guilde.
 * @param {Tool} tool - L'outil à afficher.
 * @param {function} onPress - Fonction appelée lors de la pression sur la carte.
 * @param {string} mode - 'edit' pour modifier, 'select' pour sélectionner.
 * @param {function} onSelect - Fonction appelée pour indiquer si l'outil est sélectionné.
 * @param {boolean} isSelected - Indique si l'outil est sélectionné.
 **/
const ToolCard = (props: ToolCardProps): ReactNode => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const handleSelect = () => {
        if (props.mode === 'select') {
            const newSelectedState = !isSelected;
            setIsSelected(newSelectedState);
            props.onSelect(newSelectedState); // Appel de la fonction de sélection avec la nouvelle valeur
        }
    }

    const handleDelete = () => {
        props.onDelete?.();
    }
        

    return (<View style={styles.card}>
        <Pressable 
            style={styles.updateBtn}
            onPress={() => props.onPress(props.tool)}
        >
            {props.mode === 'edit' && <View style={[styles.isEnable, props.tool.enabled ? styles.actif : styles.inactif]}>
                <Text style={[styles.text, props.tool.enabled ? styles.actif : styles.inactif]}>
                    {props.tool.enabled ? 'Actif' : 'Inactif'}
                </Text>
            </View>}
            <View style={styles.name}>
                <Text style={styles.text}>{props.tool.option}</Text>
            </View>
            <View style={styles.coef}>
                <Text style={styles.text}>x{props.tool.coef}</Text>
            </View>
        </Pressable>
        {props.mode === 'edit' && <Pressable
            style={styles.deleteBtn}
            onPress={() => handleDelete()}
        >
            <Image
                source={require('@/assets/images/icons/delete-white-green.png')}
                style={{ width: 24, height: 24 }}
            />
        </Pressable>}
        {props.mode === 'select' && <Pressable style={styles.selectBtn} onPress={() => handleSelect()}>
            {isSelected ? <Image
                source={require('@/assets/images/icons/selected.png')}
                style={{ width: 24, height: 24 }}
            /> : <Image
                source={require('@/assets/images/icons/unselected.png')}
                style={{ width: 24, height: 24 }}
            />}
        </Pressable>}
    </View>)
}

export default ToolCard;

const styles= StyleSheet.create({
    card: {
        backgroundColor: AppColors.light,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    updateBtn: {
        backgroundColor: AppColors.light,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        paddingVertical: 10,
    },
    isEnable: {
        width: '15%',
        justifyContent: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
    text: {
        color: AppColors.dark,
    },
    name: {
        width: '40%',
    },
    coef: {
        width: '20%',
    },
    selectBtn: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actif: {
        textAlign: 'center',
        backgroundColor: AppColors.ok
    },
    inactif: {
        textAlign: 'center',
        backgroundColor: AppColors.error,
    },
    deleteBtn: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.light,
    }
})