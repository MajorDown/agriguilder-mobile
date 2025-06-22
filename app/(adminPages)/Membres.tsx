import AppPage from '@/components/AppPage';
import { Text } from 'react-native';

const Membres = () => {
    return (<AppPage 
        adminOnly 
        title="Les membres de la guilde"
    >
        <Text>page des memebres de la guilde</Text>
    </AppPage>)
}

export default Membres;