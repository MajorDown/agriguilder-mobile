import AppColors from "@/constants/AppColors";
import { Tool } from "@/constants/Types";
import { StyleSheet, Text, View } from "react-native";

type ToolCardProps = {
    tool: Tool
}

const ToolCard = (props: ToolCardProps) => {
    return (<View style={styles.card}>
        <View style={styles.name}>
            <Text style={styles.text}>{props.tool.option}</Text>
        </View>
        <View style={styles.coef}>
            <Text style={styles.text}>x{props.tool.coef}</Text>
        </View>

    </View>)
}

export default ToolCard;

const styles= StyleSheet.create({
    card: {
        backgroundColor: AppColors.light,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        marginBottom: 10,
    },
    text: {
        color: AppColors.dark,
    },
    name: {},
    coef: {},
    buttons: {}
})