import { View, StyleSheet, ScrollView } from "react-native";
import { PropsWithChildren } from "react";
import Header from "./Header";
import { useAppContext } from '@/contexts/AppContext';

export type AppPageProps = PropsWithChildren<{
    title: string;
    for: 'user' | 'admin' | 'member';
}>

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
    },
    content: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})

/*
 * @description Wrapper de page pour les composants de l'application
 * @param {PropsWithChildren} props
 * @returns {JSX.Element}
 */
const AppPage = (props: AppPageProps): JSX.Element => {
    const { admin, member } = useAppContext();   

    return (<View style={style.container}>
        <Header />
        <ScrollView style={style.content}>
            {props.children}
        </ScrollView>
    </View>)
}

export default AppPage;