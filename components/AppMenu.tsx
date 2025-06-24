import PagesLister from "@/constants/PagesLister";
import { useAppContext } from "@/contexts/AppContext";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import MenuButton from "./buttons/MenuButton";

const AppMenu = (): ReactNode => {
    const { member, admin } = useAppContext();

    // filtrage : si il y a un admin, on affiche les pages pour les admin et user
    // si il y a un member, on affiche les pages pour les membres et user
    const filteredPages = PagesLister.filter(page => {
        if (admin) {
            return page.for === 'admin' || page.for === 'user';
        } else if (member) {
            return page.for === 'member' || page.for === 'user';
        }
        // return false; // si ni admin ni member, on ne retourne rien
        return page.for === 'admin' || page.for === 'user'; // pour tester coté admin
    });

    return (
        <View style={styles.container}>
            {filteredPages.map((page, index) => (
                <MenuButton
                    key={index}
                    for={page.for}
                    name={page.name}
                />
            ))}
        </View>
    );
}

export default AppMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        padding: 20,
        gap: 20
    },
})