import AppModal from '@/components/AppModal';
import AppPage from '@/components/AppPage';
import AppButton from '@/components/buttons/AppButton';
import ToolLister from '@/components/lists/ToolLister';
import AppText from '@/components/texts/AppText';
import { Tool } from '@/constants/Types';
import { useState } from 'react';

const Outils = () => {
    const newTool: Tool = {
        option: '',
        coef: 1,
        enabled: true
    };
    const [wantToolForm, setWantToolForm] = useState<boolean>(false);
    const [toolToEdit, setToolToEdit] = useState<Tool>(newTool);

    const handleGetToolForm = (toolToEdit?: Tool) => {
        setWantToolForm(true);
        if (toolToEdit) setToolToEdit(toolToEdit);
        else setToolToEdit(newTool);
    }

    return (<AppPage adminOnly title="Les outils de la guilde">
        {wantToolForm && <AppModal visible={wantToolForm} onClose={() => setWantToolForm(false)} title={toolToEdit.option}>
            <AppText>Contenu du modal</AppText>
        </AppModal>}
        <AppButton 
            type="light" 
            onPress={() => handleGetToolForm()} 
            text={'Créer un nouvel outils'} 
        />
        <ToolLister onToolEdit={(tool: Tool) => handleGetToolForm(tool)} />
    </AppPage>)
}

export default Outils;