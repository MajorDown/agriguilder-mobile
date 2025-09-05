import React, { ReactNode } from "react";
import { View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppEmailInput from "../inputs/AppEmailInput";
import AppTextInput from "../inputs/AppTextInput";

const CreateAdminForm = (): ReactNode => {
    return (<AppModal visible={true} onClose={() => {}} title="Créer un nouvel admin">
                <View>
                    <AppTextInput label={'son nom :'} placeholder="Dupont" />
                    <AppTextInput label={'son prénom :'} placeholder="Jean" />
                    <AppEmailInput label={'son email :'} />
                    <AppButton text="Créer" onPress={() => { } } type={"light"} />
                </View>
    </AppModal>);
};

export default CreateAdminForm;