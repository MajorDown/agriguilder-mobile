import AppMenu from '@/components/AppMenu';
import AppPage from '@/components/AppPage';
import LoginRedirector from '@/components/LoginRedirector';
import AppText from '@/components/texts/AppText';
import { useAppContext } from '@/contexts/AppContext';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { member, admin } = useAppContext();

  return (
    <AppPage title="Bienvenue">
      {(member || admin) && <AppText>page d'Accueil</AppText>}
      {!member && !admin && <LoginRedirector withMessage/>}
      <AppMenu />
    </AppPage>
  )
}

const styles = StyleSheet.create({});
