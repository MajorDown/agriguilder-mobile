import { ReactNode, useState } from "react";
import { StyleSheet, View } from 'react-native';
import AppModal from '../AppModal';
import AppButton from "../buttons/AppButton";
import AppSelect from "../inputs/AppSelect";
import AppText from "../texts/AppText";

type Props = {
    visible: boolean;
    onClose: () => void;
}

const ReinitGuildCountsForm = (props: Props): ReactNode => {
    const [selectedOption, setSelectedOption] = useState<'keep' | 'delete'>('keep');
    const [wantToReset, setWantToReset] = useState<boolean>(false);
    const [hasbeenReset, setHasbeenReset] = useState<boolean>(false);

    const handleSubmit = async () => {

    }

    return (<AppModal visible={props.visible} onClose={() => {props.onClose()}} title="Réinitialiser les compteurs">
        <View style={styles.container}>
            <AppText>Il s'agit de remettre à 0 les compteurs de chaque membres de la guilde, sans exception.
                Vous pouvez choisir de conserver l'historique des interventions, ou de les supprimer également.
                Cette action est irréversible.
            </AppText>
            <AppText>Souhaitez-vous conserver l'historique ?</AppText>
            <AppSelect 
                options={[
                    { label: "conserver", value: "keep" },
                    { label: "supprimer", value: "delete" },
                ]} 
                onSelect={(v) => {setSelectedOption(v as 'keep' | 'delete')}} 
            />
            {wantToReset && <AppButton type={'light'} text="Réinitialiser" onPress={() => setWantToReset(true)} />}
            {wantToReset && <>
                <AppText>Êtes-vous sûr de vouloir réinitialiser les compteurs de toute la guilde ?</AppText>
                <AppButton type={'green'} text="je confirme" onPress={() => {handleSubmit()}} />
                <AppButton type={'light'} text="Annuler" onPress={() => {setWantToReset(false)}} />
            </>}
        </View>
    </AppModal>)
}

export default ReinitGuildCountsForm;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});