import React, { ReactNode } from "react";
import { View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from '../buttons/AppButton';
import AppTextInput from "../inputs/AppTextInput";
import AppText from "../texts/AppText";

const CreateAdminForm = (): ReactNode => {
    return (<AppModal visible={true} onClose={() => {}} title="Créer un nouvel admin">
                <View>
                    <AppText>son nom :</AppText>
                    <AppTextInput placeholder="Dupont" />
                    <AppText>son prénom :</AppText>
                    <AppTextInput placeholder="Jean" />
                    <AppButton text="Créer" onPress={() => { } } type={"light"} />
                </View>
    </AppModal>);
};

export default CreateAdminForm;