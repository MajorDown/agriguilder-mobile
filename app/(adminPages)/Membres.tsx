import AppPage from '@/components/AppPage';
import MemberCard from '@/components/cards/MemberCard';
import AppText from '@/components/texts/AppText';

const exemple = {
    name: 'John Doe',
    mail: 'john.doe@example.com',
    phone: '1234567890',
    counter: 5.25,
    guild: 'Guilde des Explorateurs',
}

const Membres = () => {
    return (<AppPage 
        adminOnly 
        title="Les membres de la guilde"
    >
        <AppText>page des membres de la guilde</AppText>
        <MemberCard member={exemple} mode="view" />
    </AppPage>)
}

export default Membres;