import { useState } from "react";
import { View, StyleSheet } from "react-native";
import AppPage from "@/components/AppPage";
import AppPwdInput from "@/components/inputs/AppPwdInput";
import AppTextInput from "@/components/inputs/AppTextInput";
import AppButton from "@/components/buttons/AppButton";
import AppText from "@/components/texts/AppText";
import AppSelect from "@/components/inputs/AppSelect";

const LoginPage = ():JSX.Element => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userType, setUserType] = useState<string>("member");

    return (<AppPage title="Login">
        <View style={styles.container}>
            <AppText>Vous souhaitez vous connecter en tant que :</AppText>
            <AppSelect
                options={[
                    { label: 'Membre', value: 'member' },
                    { label: 'Admin', value: 'admin' }
                ]}                
                onSelect={(itemValue) => setUserType(itemValue as string)}
                placeholder="votre rôle"
            />
            <AppText>Renseignez vos identifiants :</AppText>
            <AppTextInput placeholder="votre mail" />
            <AppPwdInput placeholder="votre mot de passe" />
            <AppButton text="Se connecter" onPress={() => { } } type={"light"} />
        </View>
    </AppPage>)
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {      
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
    }
})