import Colors from '@/constants/AppColors';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, TextInput, Vibration, View } from 'react-native';
import AppText from '../texts/AppText';

export type AppEmailInputProps = {
  label?: string;
  value?: string;
  onChange?: (email: string) => void;
  required?: boolean;
};

/**
 * @description Composant d'input email avec 3 champs (local, domain, tld) + vibration & shake en cas d'erreur
 * @params props.label - Le label du champ
 * @params props.value - La valeur actuelle de l'email
 * @params props.onChange - Fonction appelée lors du changement de valeur
 * @params props.required - Indique si le champ est requis
 */
const AppEmailInput = (props: AppEmailInputProps): ReactNode => {
  // Découpe la valeur initiale si présente
  const initialLocal = props.value?.split('@')[0] || '';
  const afterAt = props.value?.split('@')[1] || '';
  const initialDomain = afterAt.split('.')[0] || '';
  const initialTld = afterAt.split('.')[1] || '';

  const [local, setLocal] = useState<string>(initialLocal);
  const [domain, setDomain] = useState<string>(initialDomain);
  const [tld, setTld] = useState<string>(initialTld);

  const [error, setError] = useState<string | null>(null);
  const [errLocal, setErrLocal] = useState<boolean>(false);
  const [errDomain, setErrDomain] = useState<boolean>(false);
  const [errTld, setErrTld] = useState<boolean>(false);

  // Animations de shake pour chaque champ
  const shakeLocal = useState(new Animated.Value(0))[0];
  const shakeDomain = useState(new Animated.Value(0))[0];
  const shakeTld = useState(new Animated.Value(0))[0];

  // Resync si props.value change
  useEffect(() => {
    const v = props.value || '';
    const l = v.split('@')[0] || '';
    const a = v.split('@')[1] || '';
    const d = a.split('.')[0] || '';
    const t = a.split('.')[1] || '';
    setLocal(l);
    setDomain(d);
    setTld(t);
  }, [props.value]);

  // Compose l'email à partir de l'état courant
  const composedEmail = useMemo(() => {
    return local && domain && tld ? `${local}@${domain}.${tld}` : '';
  }, [local, domain, tld]);

  // Propage la valeur composée vers le parent
  useEffect(() => {
    if (props.onChange) props.onChange(composedEmail);
  }, [composedEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerShake = (anim: Animated.Value) => {
    anim.setValue(0);
    Animated.spring(anim, {
      toValue: 1,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    }).start(() => anim.setValue(0));
  };

  const validatePart = (type: 'local' | 'domain' | 'tld', value: string): boolean => {
    if (props.required && !value) return false;

    // Règles simples (comme ton modèle)
    if (type === 'local') return /^[\w.-]+$/.test(value); // lettres/chiffres/underscore/point/tiret
    if (type === 'domain') return /^[\w-]+$/.test(value); // lettres/chiffres/underscore/tiret
    if (type === 'tld') return /^[a-zA-Z]{2,}$/.test(value); // au moins 2 lettres
    return true;
  };

  const validateAll = (): boolean => {
    const okLocal = validatePart('local', local);
    const okDomain = validatePart('domain', domain);
    const okTld = validatePart('tld', tld);

    setErrLocal(!okLocal);
    setErrDomain(!okDomain);
    setErrTld(!okTld);

    if (props.required && (!local || !domain || !tld)) {
      setError('Tous les champs sont requis');
      return false;
    }

    if (!okLocal || !okDomain || !okTld) {
      setError('Format invalide');
      return false;
    }

    setError(null);
    return true;
  };

  const handleChange = (type: 'local' | 'domain' | 'tld', value: string) => {
    if (type === 'local') {
      setLocal(value);
      // réinitialise l'erreur locale si l'utilisateur corrige
      if (errLocal) setErrLocal(false);
    }
    if (type === 'domain') {
      setDomain(value);
      if (errDomain) setErrDomain(false);
    }
    if (type === 'tld') {
      setTld(value);
      if (errTld) setErrTld(false);
    }
  };

  const handleBlur = (type: 'local' | 'domain' | 'tld') => {
    const current = type === 'local' ? local : type === 'domain' ? domain : tld;
    const isValid = validatePart(type, current);

    // Gestion requise
    if (props.required && !current) {
      if (type === 'local') setErrLocal(true);
      if (type === 'domain') setErrDomain(true);
      if (type === 'tld') setErrTld(true);

      setError('Tous les champs sont requis');
      Vibration.vibrate(100);
      triggerShake(type === 'local' ? shakeLocal : type === 'domain' ? shakeDomain : shakeTld);
      return;
    }

    // Gestion format
    if (!isValid) {
      if (type === 'local') setErrLocal(true);
      if (type === 'domain') setErrDomain(true);
      if (type === 'tld') setErrTld(true);

      setError('Format invalide');
      Vibration.vibrate(100);
      triggerShake(type === 'local' ? shakeLocal : type === 'domain' ? shakeDomain : shakeTld);
      return;
    }

    // Si ce champ est valide, on tente une validation globale pour nettoyer le message
    if (isValid) {
      if (type === 'local') setErrLocal(false);
      if (type === 'domain') setErrDomain(false);
      if (type === 'tld') setErrTld(false);
      validateAll();
    }
  };

  const shakeStyle = (anim: Animated.Value) => ({
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [0, -5, 5, -3, 0],
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      {props.label && <AppText>{props.label}</AppText>}
      <View style={styles.row}>
        <Animated.View style={shakeStyle(shakeLocal)}>
          <TextInput
            placeholder="john"
            value={local}
            onChangeText={(v) => handleChange('local', v)}
            onBlur={() => handleBlur('local')}
            style={[styles.input, styles.local, errLocal && styles.inputError]}
            accessible
            accessibilityLabel="Partie locale de l’email"
            autoCapitalize="none"
          />
        </Animated.View>

        <AppText>@</AppText>

        <Animated.View style={shakeStyle(shakeDomain)}>
          <TextInput
            placeholder="gmail"
            value={domain}
            onChangeText={(v) => handleChange('domain', v)}
            onBlur={() => handleBlur('domain')}
            style={[styles.input, styles.domain, errDomain && styles.inputError]}
            accessible
            accessibilityLabel="Domaine de l’email"
            autoCapitalize="none"
          />
        </Animated.View>

        <AppText>.</AppText>

        <Animated.View style={shakeStyle(shakeTld)}>
          <TextInput
            placeholder="com"
            value={tld}
            onChangeText={(v) => handleChange('tld', v)}
            onBlur={() => handleBlur('tld')}
            style={[styles.input, styles.tld, errTld && styles.inputError]}
            accessible
            accessibilityLabel="Extension (TLD) de l’email"
            autoCapitalize="none"
          />
        </Animated.View>
      </View>

      {error && <AppText type="error">{error}</AppText>}
    </View>
  );
};

export default AppEmailInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    gap: 5
  },
  label: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    color: Colors.global,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  input: {
    backgroundColor: Colors.global,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.dark,
  },
  inputError: {
    borderColor: Colors.error,
  },
  local: {
    width: 110,
  },
  domain: {
    width: 100,
  },
  tld: {
    width: 50,
  },
  error: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});
