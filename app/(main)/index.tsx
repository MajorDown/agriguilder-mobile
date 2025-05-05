import { StyleSheet } from 'react-native';
import AppPage from '@/components/AppPage';
import AppText from '@/components/texts/AppText';
import { useAppContext } from '@/contexts/AppContext';
import LoginRedirector from '@/components/LoginRedirector';
import AppTextInput from '@/components/inputs/AppTextInput';
import AppPwdInput from '@/components/inputs/AppPwdInput';
import AppSelect, {SelectOption} from '@/components/inputs/AppSelect';
import { useState, useEffect } from 'react';
import test from '@/utils/requests/tests';

const options: SelectOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' }
]

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
