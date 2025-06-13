import { useAppContext } from "@/contexts/AppContext";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const AppMenu = (): ReactNode => {
    const { member, admin } = useAppContext();
    return (
        <View style={styles.container}>
        </View>
    );

}

export default AppMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 10,
    },
})