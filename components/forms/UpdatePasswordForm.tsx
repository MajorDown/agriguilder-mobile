import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';
import updatePassword from '@/utils/requests/updatePassword';
import { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppPwdInput from '../inputs/AppPwdInput';
import AppText from '../texts/AppText';

type Props = {
  visible: boolean;
  onClose: () => void;
};

/**
 * @description Formulaire de mise à jour du mot de passe (version mobile alignée sur l'API web)
 */
const UpdatePasswordForm = ({ visible, onClose }: Props): ReactNode => {
  const { admin } = useAdminContext();
  const { member } = useMemberContext();

  // Récupération des infos d'auth depuis les contexts
  const token = admin?.token ?? member?.token ?? '';
  const rawMail = admin?.mail ?? member?.mail ?? '';
  const mail = rawMail.toLowerCase(); // aligne avec la recherche côté API
  const status = (admin ? 'admin' : 'member') as 'admin' | 'member';

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isNewPasswordStrong, setIsNewPasswordStrong] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  // Vérifie la cohérence "nouveau" = "confirmation"
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
        'Le nouveau mot de passe est insuffisant (minuscule, majuscule, chiffre, caractère spécial, 10 caractères min.)'
      );
      return;
    }

    if (!token || !mail) {
      setError('Utilisateur non authentifié.');
      return;
    }

    // ✅ Normalisation + trim pour éviter les faux négatifs (espaces invisibles, guillemets “intelligents”…)
    const oldClean = oldPassword.normalize('NFKC').trim();
    const newClean = newPassword.normalize('NFKC').trim();

    try {
      // (facultatif) log utile de debug
      console.log('updatePassword payload:', { status, mail, oldLen: oldClean.length, newLen: newClean.length });

      await updatePassword({
        oldPassword: oldClean,
        newPassword: newClean,
        token,
        status,
        mail, // déjà en lowercase
      });

      setIsChanged(true);
      setError(null);

      // Reset des champs
      setOldPassword('');
      setNewPassword('');
      setConfirmedPassword('');
      setIsNewPasswordStrong(false);

      // Masque le message succès après 3s
      setTimeout(() => setIsChanged(false), 3000);
    } catch (e: any) {
      setError(typeof e?.message === 'string' && e.message ? e.message : 'Une erreur est survenue');
    }
  };

  return (
    <AppModal visible={visible} onClose={onClose} title="Mettre à jour le mot de passe">
      <View style={styles.container}>
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
          isSecured={setIsNewPasswordStrong} // passe true si conforme à la regex côté mobile
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

export default UpdatePasswordForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
