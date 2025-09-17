import { ConnectedAdmin, NewAdminInfos } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import createAdmin from "@/utils/requests/forAdmin/createAdmin";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppEmailInput from "../inputs/AppEmailInput";
import AppPhoneInput from "../inputs/AppPhoneInput";
import AppTextInput from "../inputs/AppTextInput";
import AppText from "../texts/AppText";

type NewAdminDTO = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

type CreateAdminInputsValidation = {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
}

type Props = {
    visible: boolean;
    onClose: () => void;
}

/**
 * @description Formulaire de création d'un nouvel admin
 * @returns {ReactNode} Le composant CreateAdminForm
 * */
const CreateAdminForm = (props: Props): ReactNode => {
    const {admin} = useAdminContext();

    const [newAdmin, setNewAdmin] = useState<NewAdminDTO>({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [inputsValidation, setInputsValidation] = useState<CreateAdminInputsValidation>({
        firstName: false,
        lastName: false,
        email: false,
        phone: false
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const validateInputs = () => {
        setInputsValidation({
            firstName: newAdmin.firstName !== '',
            lastName: newAdmin.lastName !== '',
            email: newAdmin.email !== '',
            phone: newAdmin.phone !== ''
        });
    };

    useEffect(() => {
        validateInputs();
    }, [newAdmin]);

    const handleSubmit = async () => {
        try {
            if (newAdmin.firstName === '' || newAdmin.lastName === '' || newAdmin.email === '' || newAdmin.phone === '') {
                setError("Veuillez remplir tous les champs");
                return;
            }
            const newAdminInfos = {
                name: newAdmin.firstName + ' ' + newAdmin.lastName,
                mail: newAdmin.email,
                phone: newAdmin.phone,
                guild: admin?.guild
            }
            const response = await createAdmin(newAdminInfos as NewAdminInfos, admin as ConnectedAdmin);
            console.log("CreateAdminForm ~> Admin créé avec succès:", response);
            // Réinitialiser le formulaire après création réussie
            setError(null);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            setNewAdmin({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
        } catch (error) {
            console.log("CreateAdminForm ~> Error:", error);
            setError("Erreur lors de la création de l'admin");
        }
    };

    return (<AppModal visible={props.visible} onClose={() => {props.onClose()}} title="Créer un nouvel admin">
                <View style={Styles.container}>
                    <AppTextInput 
                        label={'son nom :'} 
                        placeholder={"Dupont"}
                        value={newAdmin.lastName}
                        onChange={(v) => setNewAdmin({...newAdmin, lastName: v})}
                    />
                    <AppTextInput 
                        label={'son prénom :'} 
                        placeholder={"Jean" }
                        value={newAdmin.firstName}
                        onChange={(v) => setNewAdmin({...newAdmin, firstName: v})}
                    />
                    <AppEmailInput 
                        label={'son email :'} 
                        value={newAdmin.email}
                        onChange={(v) => setNewAdmin({...newAdmin, email: v})}
                    />
                    <AppPhoneInput 
                        label={'son téléphone :'} 
                        value={newAdmin.phone}
                        onChange={(v) => setNewAdmin({...newAdmin, phone: v})}
                    />
                    <AppButton text="Créer" onPress={() => handleSubmit()} type={"light"} />
                    {error && <AppText type="error">{error}</AppText>}
                    {success && <AppText type="infos">L'admin a été créé avec succès !</AppText>}
                </View>
    </AppModal>);
};

export default CreateAdminForm;

const Styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
});