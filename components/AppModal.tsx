import { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";
import AppButton from "./buttons/AppButton";
import AppText from "./texts/AppText";

type AppModalProps = {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

const AppModal = (props: AppModalProps): ReactNode => {
    return (<Modal
        visible={props.visible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent

    >
        <View style={styles.overlay}>
            {props.title && <AppText>{props.title}</AppText>}
            <View style={styles.container}>
                <AppButton type='light' onPress={() => props.onClose()} text='X' />
                {props.children}
            </View>
        </View>
    </Modal>)
}

export default AppModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    }
})