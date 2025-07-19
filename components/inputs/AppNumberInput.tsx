import Colors from "@/constants/AppColors";
import { ReactNode, useEffect, useState } from "react";
import {
    Animated,
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    Vibration,
    View,
} from "react-native";

export type AppNumberInputProps = {
    label?: string;
    placeholder?: string;
    value?: number;
    onChange?: (value: number | null) => void;
    required?: boolean;
    allowDecimal?: boolean;
};

/**
 * @description Input numérique réutilisable avec gestion d’erreur, vibration et animation.
 */
const AppNumberInput = ({
    label,
    placeholder,
    value,
    onChange,
    required,
    allowDecimal = false,
}: AppNumberInputProps): ReactNode => {
    const [text, setText] = useState<string>(
        value !== undefined && value !== null ? String(value) : ""
    );
    const [error, setError] = useState<string | null>(null);
    const shakeAnimation = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (value !== undefined && value !== null) {
            setText(String(value));
        }
    }, [value]);

    const triggerShake = () => {
        shakeAnimation.setValue(0);
        Animated.spring(shakeAnimation, {
            toValue: 1,
            friction: 3,
            tension: 50,
            useNativeDriver: true,
        }).start(() => shakeAnimation.setValue(0));
    };

    const isValid = (txt: string): boolean => {
        if (txt === "") return !required;
        const regex = allowDecimal ? /^-?\d*([.,]\d*)?$/ : /^-?\d+$/;
        return regex.test(txt);
    };

    const handleChange = (txt: string) => {
        const cleaned = txt.replace(
            allowDecimal ? /[^0-9.,-]/g : /[^0-9-]/g,
            ""
        );
        setText(cleaned);

        if (onChange) {
            const normalized = cleaned.replace(",", ".");
            const parsed =
                cleaned.trim() === "" || !isValid(cleaned)
                    ? null
                    : Number(normalized);
            onChange(Number.isNaN(parsed as number) ? null : (parsed as number));
        }
    };

    const handleBlur = () => {
        if (required && text.trim() === "") {
            setError("Ce champ est requis");
            Vibration.vibrate(100);
            triggerShake();
        } else if (!isValid(text)) {
            setError("Nombre invalide");
            Vibration.vibrate(100);
            triggerShake();
        } else {
            setError(null);
        }
    };

    const keyboardType: KeyboardTypeOptions = allowDecimal
        ? "decimal-pad"
        : "number-pad";

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Animated.View
                style={{
                    transform: [
                        {
                            translateX: shakeAnimation.interpolate({
                                inputRange: [0, 0.25, 0.5, 0.75, 1],
                                outputRange: [0, -5, 5, -3, 0],
                            }),
                        },
                    ],
                }}
            >
                <TextInput
                    value={text}
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder || "0"}
                    style={[styles.input, error && styles.inputError]}
                    keyboardType={keyboardType}
                    accessible
                    accessibilityLabel={label}
                />
            </Animated.View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default AppNumberInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
    },
    label: {
        fontSize: 16,
        fontFamily: "Montserrat",
        fontWeight: "700",
        marginBottom: 5,
        color: Colors.global,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.dark,
        backgroundColor: Colors.global,
        padding: 5,
        fontSize: 16,
        width: 300,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 5,
    },
});
