
import { View, Image, Text, StyleSheet, ImageSourcePropType } from "react-native";
import {usePathname} from 'expo-router';
import Colors from "@/constants/Colors";

type Props = {
    title: string;
    icon: ImageSourcePropType;
}

/**
 * @description Composant gérant la couleur des icones d'onglet
 * @param {string} props.title
 * @returns JSX.Element
 */
const TabsIcon = (props: Props):JSX.Element => {
    const actualPath = usePathname();

    return (<View style={Styles.container}>
        <Image source={props.icon} style={Styles.image} />
    </View>)
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 30,
        height: 30
    },
})

export default TabsIcon;