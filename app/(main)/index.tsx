import { View, Text, StyleSheet } from 'react-native';
import AppPage from '@/components/AppPage';
import AppText from '@/components/texts/AppText';

export default function HomeScreen() {
  return (
    <AppPage title="Home" for="user">
      <AppText>index</AppText>
    </AppPage>
  );
}

const styles = StyleSheet.create({
});
