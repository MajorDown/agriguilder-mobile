import AppColors from "@/constants/AppColors";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const InterventionCard = (): ReactNode => {
    return (
        <View style={styles.card}>
        </View>
    )
}

export default InterventionCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.light,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
});