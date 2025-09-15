import AppColors from "@/constants/AppColors";
import { ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import AppText from "./texts/AppText";

type AppModalProps = {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    maxHeightRatio?: number;
    avoidKeyboard?: boolean;
};

const AppModal = ({
    visible,
    onClose,
    children,
    title,
    maxHeightRatio = 0.8,
    avoidKeyboard = true,
}: AppModalProps): ReactNode => {
    const { height: windowHeight } = useWindowDimensions();
    const maxHeight = Math.max(1, Math.min(windowHeight * maxHeightRatio, windowHeight - 32));

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Fond cliquable derrière la carte */}
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

                {/* Carte centrée au-dessus du fond */}
                <KeyboardAvoidingView
                    enabled={avoidKeyboard}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.center}
                >
                    <View style={[styles.card, { maxHeight }]}>
                        {title ? <AppText>{title}</AppText> : null}

                        <ScrollView
                            style={styles.scroll}
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="always"
                            nestedScrollEnabled
                            showsVerticalScrollIndicator
                        >
                            {children}
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default AppModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.67)",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "90%",
        gap: 10,
        backgroundColor: AppColors.dark,
        borderRadius: 12,
        padding: 12,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        alignSelf: "center",
        flexShrink: 1,
    },
    title: { marginBottom: 8 },
    scroll: { alignSelf: "stretch" },
    scrollContent: {
        gap: 10,
        paddingBottom: 8,
        // Optionnel si tu veux que le body pousse vers le bas quand peu de contenu :
        // flexGrow: 1,
    },
});
