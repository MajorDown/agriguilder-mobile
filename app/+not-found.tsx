import AppPage from '@/components/AppPage';
import AppText from '@/components/texts/AppText';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {

  return (
    <AppPage title="404 - Page non trouvée">
      <AppText>La page que vous cherchez n'existe pas.</AppText>
      <Link href="/" style={{ marginTop: 20 }}>Page d'accueil</Link>
    </AppPage>
  )
}

const styles = StyleSheet.create({});