import { View, Text, TextInput, StyleSheet, Vibration, Animated, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';

export type AppPwdInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  required?: boolean;
};

/**
 * @description Input mot de passe réutilisable avec affichage/masquage, animation shake, et vérif champ requis.
 */
const AppPwdInput = (props: AppPwdInputProps) => {
  const [value, setValue] = useState<string>(props.value || '');
  const [error, setError] = useState<string | null>(null);
  const [secure, setSecure] = useState<boolean>(true);
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
    }).start(() => shakeAnimation.setValue(0));
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
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
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
          placeholder={props.placeholder || 'Votre mot de passe...'}
          secureTextEntry={secure}
          style={[styles.input, error && styles.inputError, { flex: 1 }]}
          accessible={true}
          accessibilityLabel={props.label}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.toggle}>
          {secure ? <Image source={require('@/assets/images/icons/visible_on.png')} /> : <Image source={require('@/assets/images/icons/visible_off.png')} />}
        </TouchableOpacity>
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AppPwdInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    backgroundColor: Colors.global,
    zIndex: 1
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.global,
    zIndex: 1
  },
  input: {
    backgroundColor: Colors.global,
    padding: 5,
    fontSize: 16,
    width: '100%',
    zIndex: 1
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
  toggle: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
});
