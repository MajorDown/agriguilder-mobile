import AppPage from '@/components/AppPage';
import MemberLister from '@/components/lists/MemberLister';

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
        <MemberLister mode="edit" />
    </AppPage>)
}

export default Membres;