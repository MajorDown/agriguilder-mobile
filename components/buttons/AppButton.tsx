import Colors from "@/constants/AppColors";
import { Pressable, StyleSheet, Text } from "react-native";

export type AppButtonProps = {
    type: 'light' | 'dark';
    text: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    light: {
        backgroundColor: Colors.light,
        color: Colors.dark,
    },
    dark: {
        backgroundColor: Colors.dark,
        color: Colors.global,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})

/**
 * bouton de l'application, permet de changer le style du bouton en fonction de son type
 * @param props.type - le type de bouton, light ou dark
 * @param props.text - le texte à afficher sur le bouton
 * @param props.onPress - la fonction à appeler lors du clic sur le bouton
 * @returns JSX.Element
 */
const AppButton = (props: AppButtonProps) => {
    return (<Pressable style={[styles.button, styles[props.type]]} onPress={props.onPress}>
        <Text style={[styles.text, styles[props.type]]}>{props.text}</Text>
    </Pressable>)
}

export default AppButton;