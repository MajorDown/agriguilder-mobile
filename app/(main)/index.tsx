import { StyleSheet } from 'react-native';
import AppPage from '@/components/AppPage';
import AppText from '@/components/texts/AppText';
import { useAppContext } from '@/contexts/AppContext';
import LoginRedirector from '@/components/LoginRedirector';
import AppTextInput from '@/components/inputs/AppTextInput';
import AppPwdInput from '@/components/inputs/AppPwdInput';

export default function HomeScreen() {
  const { member, admin } = useAppContext();

  return (
    <AppPage title="Bienvenue">
      <AppTextInput
        label="Nom d'utilisateur"
        placeholder="Entrez votre nom d'utilisateur"
        required
        onChange={(text) => console.log(text)}
      />
      <AppPwdInput
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        required
        onChange={(text) => console.log(text)}
      />
      {member && admin && <AppText>page d'Accueil</AppText>}
      {!member && !admin && <LoginRedirector />}
    </AppPage>
  )
}

const styles = StyleSheet.create({});
