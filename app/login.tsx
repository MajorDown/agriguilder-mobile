import AppPage from "@/components/AppPage";
import AppButton from "@/components/buttons/AppButton";
import AppPwdInput from "@/components/inputs/AppPwdInput";
import AppSelect from "@/components/inputs/AppSelect";
import AppTextInput from "@/components/inputs/AppTextInput";
import AppText from "@/components/texts/AppText";
import { ConnectedAdmin, ConnectedMember } from "@/constants/Types";
import { useAppContext } from "@/contexts/AppContext";
import logUser from "@/utils/requests/logUser";
import SecureStoreManager from "@/utils/SecureStoreManager";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const LoginPage = () => {
    const { updateMember, updateAdmin } = useAppContext();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userType, setUserType] = useState<'member' | 'admin'>();
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        setError("");
        if (!email || !password || !userType) {
            setError("Veuillez renseigner votre rôle, votre mail et mot de passe");
            return;
        }
        try {
            // connexion de l'utilisateur
            const response = await logUser({userType, userMail: email, userPassword: password});
            if (userType === 'member') {
                updateMember(response as ConnectedMember);
            } else if (userType === 'admin') {
                updateAdmin(response as ConnectedAdmin);
            }
            await SecureStoreManager.storeUser(response);
            setEmail("");
            setPassword("");
            setError("");
            router.push("/");
        }
        catch (error) {
            setError(`Erreur de connexion, veuillez réessayer plus tard: ${error}`);
        }
    }

    return (<AppPage title="Login">
        <View style={styles.container}>
            <AppText>Vous souhaitez vous connecter en tant que :</AppText>
            <AppSelect
                options={[
                    { label: 'Membre', value: 'member' },
                    { label: 'Admin', value: 'admin' }
                ]}                
                onSelect={(itemValue) => setUserType(itemValue as 'admin' | 'member')}
                placeholder="votre rôle"
            />
            <AppText>Renseignez vos identifiants :</AppText>
            <AppTextInput 
                placeholder="votre mail"
                onChange={setEmail}
                value={email} 
            />
            <AppPwdInput 
                placeholder="votre mot de passe"
                onChange={setPassword}
                value={password} 
            />
            <AppButton text="Se connecter" onPress={() => {handleLogin()} } type={"light"} />
            {error && <AppText type='error'>{error}</AppText>}
        </View>
    </AppPage>)
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {      
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})