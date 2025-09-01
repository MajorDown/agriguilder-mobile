import { ReactNode } from 'react';
import { View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppPwdInput from '../inputs/AppPwdInput';
import AppText from '../texts/AppText';

type Props = {
    visible: boolean;
    onClose: () => void;
}

const UpdatePassword = ({ visible, onClose }: Props): ReactNode => {
    return (<AppModal visible={visible} onClose={onClose} title="Mettre à jour le mot de passe">
        <View>
            <AppText>Votre Ancien mot de passe</AppText>
            <AppPwdInput />
            <AppText>Nouveau mot de passe</AppText>
            <AppPwdInput />
            <AppText>Confirmer le nouveau mot de passe</AppText>
            <AppPwdInput />
            <AppButton text="Mettre à jour" onPress={() => { } } type={'light'} />
        </View>
    </AppModal>);
};


export default UpdatePassword;