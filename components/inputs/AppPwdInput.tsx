import Colors from '@/constants/AppColors';
import { useEffect, useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type AppPwdInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  /** true si le mot de passe est fort */
  isSecured?: (isSecure: boolean) => void;
  required?: boolean;
};

/** 1 minuscule, 1 majuscule, 1 chiffre, 1 spécial, longueur ≥ 10 */
const STRONG_PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

const AppPwdInput = (props: AppPwdInputProps) => {
  const [value, setValue] = useState<string>(props.value || '');
  const [secure, setSecure] = useState<boolean>(true);
  const shakeAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (props.value !== undefined) setValue(props.value);
  }, [props.value]);

  const isStrong = useMemo(() => STRONG_PWD_REGEX.test(value), [value]);

  // Rouge si rempli et faible, Vert si rempli et fort
  const showWeak = useMemo(() => value.length > 0 && !isStrong, [isStrong, value.length]);
  const showStrong = useMemo(() => value.length > 0 && isStrong, [isStrong, value.length]);

  useEffect(() => {
    props.isSecured?.(isStrong);
  }, [isStrong, props]);

  const handleChange = (text: string) => {
    setValue(text);
    props.onChange?.(text);
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
          placeholder={props.placeholder || 'Votre mot de passe...'}
          secureTextEntry={secure}
          style={[
            styles.input,
            { flex: 1 },
            showWeak && styles.inputWeakBg,     // rouge si faible
            showStrong && styles.inputStrongBg, // vert si fort
          ]}
          accessible
          accessibilityLabel={props.label || 'Mot de passe'}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          keyboardType="default"
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={() => setSecure(!secure)}
          style={styles.toggle}
          accessibilityRole="button"
          accessibilityLabel={secure ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
        >
          {secure ? (
            <Image source={require('@/assets/images/icons/visible_on.png')} />
          ) : (
            <Image source={require('@/assets/images/icons/visible_off.png')} />
          )}
        </TouchableOpacity>
      </Animated.View>
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
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.global,
    zIndex: 1,
  },
  input: {
    backgroundColor: Colors.global,
    padding: 5,
    fontSize: 16,
    width: '100%',
    zIndex: 1,
  },
  // Rouge quand faible
  inputWeakBg: {
    backgroundColor: Colors.error,
  },
  // ✅ Vert quand fort (utilise Colors.ok défini dans AppColors)
  inputStrongBg: {
    backgroundColor: Colors.ok,
  },
  toggle: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
