import { StyleSheet } from 'react-native';
import AppPage from '@/components/AppPage';
import AppText from '@/components/texts/AppText';
import { useAppContext } from '@/contexts/AppContext';
import LoginRedirector from '@/components/LoginRedirector';
import { useState, useEffect } from 'react';
import test from '@/utils/requests/tests';

export default function HomeScreen() {
  const { member, admin } = useAppContext();
  const [testResponse, setTestResponse] = useState<string>('');

  useEffect(() => {
    const fetchTest = async () => {
      const response = await test();
      setTestResponse(response);
    };

    fetchTest();
  }, []);

  return (
    <AppPage title="Bienvenue">
      {testResponse && <AppText>{testResponse}</AppText>}
      {member && admin && <AppText>page d'Accueil</AppText>}
      {!member && !admin && <LoginRedirector />}
    </AppPage>
  )
}

const styles = StyleSheet.create({});
