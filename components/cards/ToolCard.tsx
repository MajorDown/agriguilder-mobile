import AppColors from "@/constants/AppColors";
import { Tool } from "@/constants/Types";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ToolCardProps = {
    tool: Tool
    onPress: (tool: Tool) => void
}

const ToolCard = (props: ToolCardProps): ReactNode => {
    return (<Pressable 
        style={styles.card}
        onPress={() => props.onPress(props.tool)}
    >
        <View style={styles.name}>
            <Text style={styles.text}>{props.tool.option}</Text>
        </View>
        <View style={styles.coef}>
            <Text style={styles.text}>x{props.tool.coef}</Text>
        </View>
        <View style={[styles.enableBtn, props.tool.enabled ? styles.actif : styles.inactif]}>
            <Text style={[styles.text, props.tool.enabled ? styles.actif : styles.inactif]}>
                Actif
            </Text>
        </View>
    </Pressable>)
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
    text: {
        color: AppColors.dark,
    },
    name: {
        width: '40%',
    },
    coef: {
        width: '10%',
    },
    enableBtn: {
        width: '10%',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    actif: {
        textAlign: 'center',
        backgroundColor: AppColors.ok,
        textDecorationLine: 'none',
    },
    inactif: {
        textAlign: 'center',
        backgroundColor: AppColors.error,
        textDecorationLine: 'line-through',
    },
})