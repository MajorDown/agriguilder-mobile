import Colors from '@/constants/AppColors';
import { ReactNode, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, Vibration, View } from 'react-native';

export type AppTextInputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (text: string) => void;
    required?: boolean;
};

/**
 * 
 * @description Composant d'input de texte réutilisable avec gestion d'erreur, vibration et animation deluxe.
 */
const AppTextInput = (props: AppTextInputProps):ReactNode => {
    const [value, setValue] = useState<string>(props.value || '');
    const [error, setError] = useState<string | null>(null);
    const shakeAnimation = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (props.value !== undefined) {
            setValue(props.value);
        }
    }, [props.value]);

    const handleChange = (text: string) => {
        setValue(text);
        if (props.onChange) {
            props.onChange(text);
        }
    };

    const triggerShake = () => {
        shakeAnimation.setValue(0);

        Animated.spring(shakeAnimation, {
            toValue: 1,
            friction: 3,
            tension: 50,
            useNativeDriver: true,
        }).start(() => {
            shakeAnimation.setValue(0);
        });
    };

    const handleBlur = () => {
        if (props.required && !value) {
            setError('Ce champ est requis');
            Vibration.vibrate(100);
            triggerShake();
        } else {
            setError(null);
        }
    };

    return (
        <View style={styles.container}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
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
                    value={value}
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    placeholder={props.placeholder || 'Votre texte ici...'}
                    style={[styles.input, error && styles.inputError]}
                    accessible={true}
                    accessibilityLabel={props.label}
                />
            </Animated.View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default AppTextInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        zIndex: 1
    },
    label: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
        color: Colors.global,
        zIndex: 1
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.dark,
        backgroundColor: Colors.global,
        padding: 5,
        fontSize: 16,
        width: 300,
        zIndex: 1,
    },
    inputError: {
        borderColor: Colors.error,
        zIndex: 1
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 5,
        zIndex: 1
    },
});
