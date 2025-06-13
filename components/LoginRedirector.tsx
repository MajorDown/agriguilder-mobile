import AppLink from "@/components/buttons/AppLink";
import Apptext from "@/components/texts/AppText";
import { RelativePathString } from "expo-router";
import { StyleSheet, View } from "react-native";

const LoginRedirector = () => {
    return (<View style={styles.container}>
        <Apptext>Vous devez vous connecter pour accéder à l'application</Apptext>
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