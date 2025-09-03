import updatePassword from '@/utils/requests/updatePassword';
import { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppPwdInput from '../inputs/AppPwdInput';
import AppText from '../texts/AppText';

type Props = {
    visible: boolean;
    onClose: () => void;
}

/**
 * @description Formulaire de mise à jour du mot de passe
 */
const UpdatePassword = ({ visible, onClose }: Props): ReactNode => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isNewPasswordStrong, setIsNewPasswordStrong] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (newPassword && confirmedPassword && newPassword !== confirmedPassword) {
            setError('Les mots de passe ne correspondent pas');
        } else {
            setError(null);
        }
    }, [newPassword, confirmedPassword]);

    const handleSubmit = async () => {
        if (error) return;
        if (!oldPassword || !newPassword || !confirmedPassword) {
            setError('Tous les champs sont requis');
            return;
        }
        if (!isNewPasswordStrong) {
            setError(
                'Le nouveau mot de passe est insuffisant (minimum une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial, 12 caractères)'
            );
            return;
        }
        try {
            await updatePassword({ oldPassword, newPassword });
            setIsChanged(true);
            setError(null);
            // reset
            setOldPassword('');
            setNewPassword('');
            setConfirmedPassword('');
            setIsNewPasswordStrong(false);
            setTimeout(() => setIsChanged(false), 3000);
        } catch {
            setError('Une erreur est survenue');
        }
    };

    return (
        <AppModal visible={visible} onClose={onClose} title="Mettre à jour le mot de passe">
            <View>
                <AppText>Votre ancien mot de passe</AppText>
                <AppPwdInput
                    value={oldPassword}
                    onChange={setOldPassword}
                    placeholder="Ancien mot de passe"
                    required
                />
                <AppText>Nouveau mot de passe</AppText>
                <AppPwdInput
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Nouveau mot de passe"
                    isSecured={(b) => setIsNewPasswordStrong(b)}
                    required
                />
                <AppText>Confirmer le nouveau mot de passe</AppText>
                <AppPwdInput
                    value={confirmedPassword}
                    onChange={setConfirmedPassword}
                    placeholder="Confirmez le nouveau mot de passe"
                    required
                />
                {error && <AppText type="error">{error}</AppText>}
                <AppButton text="Mettre à jour" onPress={handleSubmit} type="light" />
                {isChanged && <AppText type="infos">Le mot de passe a été modifié avec succès !</AppText>}
            </View>
        </AppModal>
    );
};

export default UpdatePassword;
