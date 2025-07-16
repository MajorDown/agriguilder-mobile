import AppMenu from '@/components/AppMenu';
import AppPage from '@/components/AppPage';
import LoginRedirector from '@/components/LoginRedirector';
import AppText from '@/components/texts/AppText';
import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';

export default function HomeScreen() {
  const { member } = useMemberContext();
  const { admin } = useAdminContext();

  return (<AppPage title="Bienvenue">
    {(member || admin) && <AppText>page d'Accueil</AppText>}
    {(member || admin) && <AppMenu />}
    {!member && !admin && <LoginRedirector withMessage/>}
  </AppPage>)
}

