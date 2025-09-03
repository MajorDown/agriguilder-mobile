import Colors from '@/constants/AppColors';
import { useEffect, useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type AppPwdInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  isSecured?: (isSecure: boolean) => void;
  required?: boolean;
};

/** Au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial, longueur ≥ 12 */
const STRONG_PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

const AppPwdInput = (props: AppPwdInputProps) => {
  const [value, setValue] = useState<string>(props.value || '');
  const [secure, setSecure] = useState<boolean>(true);
  const shakeAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (props.value !== undefined) setValue(props.value);
  }, [props.value]);

  const isStrong = useMemo(() => STRONG_PWD_REGEX.test(value), [value]);

  // Fond rouge si non fort ET (champ rempli OU required)
  const showInsecureBg = useMemo(
    () => (!isStrong && (value.length > 0 || !!props.required)),
    [isStrong, value.length, props.required]
  );

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
            showInsecureBg && styles.inputInsecureBg,
          ]}
          accessible
          accessibilityLabel={props.label}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
        />
        <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.toggle}>
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
  /** Fond rouge quand mot de passe insuffisant */
  inputInsecureBg: {
    backgroundColor: Colors.error, // ajuste si tu préfères un rouge plus clair (ex: Colors.errorLight)
  },
  toggle: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
