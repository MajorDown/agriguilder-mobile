import { StyleSheet } from 'react-native';
import AppPage from '@/components/AppPage';
import AppText from '@/components/texts/AppText';
import { useAppContext } from '@/contexts/AppContext';
import LoginRedirector from '@/components/LoginRedirector';

export default function HomeScreen() {
  const { member, admin } = useAppContext();

  return (
    <AppPage title="Bienvenue">
      {(member || admin) && <AppText>page d'Accueil</AppText>}
      {!member && !admin && <LoginRedirector />}
    </AppPage>
  )
}

const styles = StyleSheet.create({});
