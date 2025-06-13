import AppLink from "@/components/buttons/AppLink";
import Apptext from "@/components/texts/AppText";
import { RelativePathString } from "expo-router";
import { StyleSheet, View } from "react-native";

type Props = {
    withMessage?: boolean;
}
/**
 * Composant qui redirige l'utilisateur vers la page de connexion s'il n'est pas connecté.
 * Affiche un message et un lien pour se connecter.
 */

const LoginRedirector = (props: Props) => {
    return (<View style={styles.container}>
        {props.withMessage && <Apptext>Vous devez vous connecter pour accéder à l'application</Apptext>}
        <AppLink text={"Se Connecter"} href={"/login" as RelativePathString}/>
    </View>);
}

export default LoginRedirector;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
});