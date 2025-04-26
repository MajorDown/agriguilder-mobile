import { View, Image, StyleSheet } from "react-native";
import PagesLister from "@/constants/PagesLister";

type Props = {
    title: string;
    isActive: boolean;
}

/**
 * @description Composant gérant la couleur des icones d'onglet
 * @param {string} props.title
 * @returns JSX.Element
 */
const TabsIcon = (props: Props):JSX.Element => {
    const tab = PagesLister.find((tab) => tab.name === props.title);
    if (!tab) return <View style={Styles.container} />;
    const tabIcon = props.isActive ? tab.active : tab.inactive;


    return (<View style={Styles.container}>
        <Image 
            source={tabIcon}
            style={Styles.image} 
        />
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