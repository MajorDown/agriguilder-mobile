import AppPage from '@/components/AppPage';
import AppButton from '@/components/buttons/AppButton';
import CreateMemberForm from '@/components/forms/CreateMemberForm';
import DeleteMemberForm from '@/components/forms/DeleteMemberForm';
import MemberLister from '@/components/lists/MemberLister';
import { Member } from '@/constants/Types';
import { useState } from 'react';

const Membres = () => {
    const [wantDeleteMemberForm, setWantDeleteMemberForm] = useState<boolean>(false);
    const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
    const [wantCreateMemberForm, setWantCreateMemberForm] = useState<boolean>(false);
    return (<AppPage
        title='Les membres de la guilde'
        adminOnly
    >
        <AppButton 
            type={'light'} 
            text='Créer un nouveau membre' 
            onPress={() => setWantCreateMemberForm(true)}
        />
        <MemberLister mode="edit" onDeleteMember={(member) => {
            setMemberToDelete(member);
            setWantDeleteMemberForm(true);
        }} />
        {wantDeleteMemberForm && (
            <DeleteMemberForm
                memberToDelete={memberToDelete!}
                visible={wantDeleteMemberForm}
                onClose={() => setWantDeleteMemberForm(false)}
            />
        )}
        {wantCreateMemberForm && (
            <CreateMemberForm
                visible={wantCreateMemberForm}
                onClose={() => setWantCreateMemberForm(false)}
            />
        )}
    </AppPage>)
}

export default Membres;