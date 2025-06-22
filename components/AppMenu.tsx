import PagesLister from "@/constants/PagesLister";
import { useAppContext } from "@/contexts/AppContext";
import { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";
import AppTitle from "./texts/AppTitle";

const AppMenu = (): ReactNode => {
    const { member, admin } = useAppContext();

    const filteredPages = PagesLister.filter(page => {
        if (page.for === 'user') {
            return member || admin;
        } else if (page.for === 'admin') {
            return admin;
        } else if (page.for === 'member') {
            return member;
        }
        return false;
    });

    return (
        <View style={styles.container}>
            {filteredPages.map((page, index) => (<View key={index}>
                <Image
                    source={page.active}
                />
                <AppTitle>{page.title}</AppTitle>
            </View>))}
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