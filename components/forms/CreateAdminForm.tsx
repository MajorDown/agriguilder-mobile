import { ReactNode, useEffect, useState } from "react";
import { View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppEmailInput from "../inputs/AppEmailInput";
import AppPhoneInput from "../inputs/AppPhoneInput";
import AppTextInput from "../inputs/AppTextInput";

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

const CreateAdminForm = (): ReactNode => {
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

    const handleSubmit = () => {
        // Soumission du formulaire si tous les champs sont valides
        if (inputsValidation.firstName && 
            inputsValidation.lastName && 
            inputsValidation.email && 
            inputsValidation.phone) {
            console.log("Form submittable:", newAdmin);
        } else {
            console.log("Form not valid:", inputsValidation);
        }
    };

    return (<AppModal visible={true} onClose={() => {}} title="Créer un nouvel admin">
                <View>
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
                </View>
    </AppModal>);
};

export default CreateAdminForm;