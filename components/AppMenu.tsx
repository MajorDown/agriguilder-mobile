import {View, Text, Image, StyleSheet} from "react-native";
import { useAppContext } from "@/contexts/AppContext";

const AppMenu = (): JSX.Element => {
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