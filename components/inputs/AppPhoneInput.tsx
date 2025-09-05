// AppPhoneInput.tsx
import Colors from "@/constants/AppColors";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export type AppPhoneInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  /** Mode de validation. 'FR' = 0XXXXXXXXX ou +33XXXXXXXXX ; 'E164' = +[8–15 chiffres] */
  mode?: "FR" | "E164";
};

/**
 * @description Champ téléphone avec validation en temps réel.
 * - FR: accepte "0XXXXXXXXX" (10 chiffres) ou "+33XXXXXXXXX" (9 chiffres après 33)
 * - E164: accepte "+[8..15 chiffres]"
 * @note Pas de message d'erreur : la bordure devient rouge si invalide.
 */
const AppPhoneInput = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  mode = "FR",
}: AppPhoneInputProps): ReactNode => {
  const [text, setText] = useState<string>(value ?? "");

  useEffect(() => {
    if (typeof value === "string" && value !== text) {
      setText(value);
    }
  }, [value]);

  /** Garde seulement chiffres, espaces, ., -, et un seul '+' en tête si présent */
  const sanitize = (raw: string): string => {
    let s = raw.replace(/[^\d+\s.\-]/g, "");
    if (s.includes("+")) {
      s =
        s.startsWith("+")
          ? "+" + s.slice(1).replace(/\+/g, "")
          : s.replace(/\+/g, "");
    }
    return s;
  };

  const digitsOnly = (s: string) => s.replace(/\D/g, "");

  const isValidFR = (s: string, original: string): boolean => {
    // FR national: 0[1-9]\d{8}
    // FR international: +33[1-9]\d{8}   (ou digitsOnly: 33[1-9]\d{8})
    const d = digitsOnly(s);
    if (/^0[1-9]\d{8}$/.test(d)) return true;
    if (/^33[1-9]\d{8}$/.test(d)) return true;
    // Tolérance si l'utilisateur tape avec séparateurs et '+'
    if (/^\+33\s?[1-9](?:[\s.\-]?\d{2}){4}$/.test(original)) return true;
    if (/^0[1-9](?:[\s.\-]?\d{2}){4}$/.test(original)) return true;
    return false;
  };

  const isValidE164 = (original: string): boolean => {
    // E.164 strict: + et 8..15 chiffres derrière
    return /^\+\d{8,15}$/.test(original.replace(/\s/g, ""));
  };

  const isValid = useMemo(() => {
    if (!text) return !required; // vide ⇒ OK si non requis
    return mode === "FR" ? isValidFR(text, text) : isValidE164(text);
  }, [text, required, mode]);

  const handleChange = (raw: string) => {
    const cleaned = sanitize(raw);
    setText(cleaned);
    onChange?.(cleaned);
  };

  // Bordure en rouge uniquement si l'utilisateur a saisi quelque chose et que ce n'est pas valide
  const showInvalid = text.length > 0 && !isValid;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={text}
        onChangeText={handleChange}
        placeholder={
          placeholder ??
          (mode === "FR" ? "06 12 34 56 78 ou +33612345678" : "+33612345678")
        }
        keyboardType="phone-pad"
        style={[styles.input, showInvalid && styles.inputError]}
        accessible
        accessibilityLabel={label}
      />
    </View>
  );
};

export default AppPhoneInput;

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
});
