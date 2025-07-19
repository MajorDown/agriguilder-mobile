import AppColors from "@/constants/AppColors";
import { ReactNode } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppText from "./texts/AppText";

type AppModalProps = {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
};

const AppModal = ({ visible, onClose, children, title }: AppModalProps): ReactNode => {
    return (<Modal
        visible={visible}
        animationType="fade"
        transparent
        statusBarTranslucent
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        {title && <AppText>{title}</AppText>}
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>);
};

export default AppModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: AppColors.dark,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        gap: 10
    }
})