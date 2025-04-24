import { View, StyleSheet, ScrollView } from "react-native";
import { PropsWithChildren } from "react";
import Header from "./Header";
import { useAppContext } from '@/contexts/AppContext';
import Colors from "@/constants/Colors";
import { router } from 'expo-router';
import AppTitle from "./texts/AppTitle";

export type AppPageProps = PropsWithChildren<{
    title: string;
    for?: 'user' | 'admin' | 'member';
}>

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        backgroundColor: Colors.dark
    },
})

/*
 * @description Wrapper de page pour les composants de l'application
 * @param {PropsWithChildren} props
 * @returns {JSX.Element}
 */
const AppPage = (props: AppPageProps): JSX.Element => {
    const { admin, member } = useAppContext();

    //si la page est pour un admin et que l'utilisateur n'est pas admin, on redirige vers la page de login
    if (props.for === 'admin' && !admin) router.replace('/login');
    //si la page est pour un membre et que l'utilisateur n'est pas membre, on redirige vers la page de login
    if (props.for === 'member' && !member) router.replace('/login');
    // si la page est pour un user et que aucun user n'est connecté, on redirige vers la page de login
    if (props.for === 'user' && !admin && !member) router.replace('/login');

    return (<View style={style.container}>
        <Header />
        <ScrollView>
            <AppTitle>{props.title}</AppTitle>
            {props.children}
        </ScrollView>
    </View>)
}

export default AppPage;