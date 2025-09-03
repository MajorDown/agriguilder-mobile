import Colors from '@/constants/AppColors';
import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../texts/AppText';
import AppTextInput from './AppTextInput';

export type AppEmailInputProps = {
    label?: string;
    value?: string;
    onChange?: (email: string) => void;
    required?: boolean;
};

/**
 * @description Composant d'input email avec 3 champs pour chaque partie de l'adresse email
 * @params props.label - Le label du champ
 * @params props.value - La valeur actuelle de l'email
 * @params props.onChange - Fonction appelée lors du changement de valeur
 * @params props.required - Indique si le champ est requis
 */
const AppEmailInput = (props: AppEmailInputProps): ReactNode => {
    // Découpe la valeur initiale si présente
    const [local, setLocal] = useState<string>(props.value?.split('@')[0] || '');
    const [domain, setDomain] = useState<string>(props.value?.split('@')[1]?.split('.')[0] || '');
    const [tld, setTld] = useState<string>(props.value?.split('@')[1]?.split('.')[1] || '');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (type: 'local' | 'domain' | 'tld', value: string) => {
        if (type === 'local') setLocal(value);
        if (type === 'domain') setDomain(value);
        if (type === 'tld') setTld(value);
        // Compose l'email
        const email = valueForEmail(type, value);
        if (props.onChange) props.onChange(email);
    };

    const valueForEmail = (type: string, value: string) => {
        let l = local, d = domain, t = tld;
        if (type === 'local') l = value;
        if (type === 'domain') d = value;
        if (type === 'tld') t = value;
        return l && d && t ? `${l}@${d}.${t}` : '';
    };

    const validateEmail = () => {
        if (props.required && (!local || !domain || !tld)) {
            setError('Tous les champs sont requis');
            return false;
        }
        // Validation simple
        if (!/^[\w.-]+$/.test(local) || !/^[\w-]+$/.test(domain) || !/^[a-zA-Z]{2,}$/.test(tld)) {
            setError('Format invalide');
            return false;
        }
        setError(null);
        return true;
    };

    return (
        <View style={styles.container}>
            {props.label && <AppText>{props.label}</AppText>}
            <View style={styles.row}>
                <AppTextInput
                    label="Nom utilisateur"
                    placeholder="ex: john"
                    value={local}
                    onChange={v => handleChange('local', v)}
                    required={props.required}
                />
                <AppText>@</AppText>
                <AppTextInput
                    label="Domaine"
                    placeholder="ex: gmail"
                    value={domain}
                    onChange={v => handleChange('domain', v)}
                    required={props.required}
                />
                <AppText>.</AppText>
                <AppTextInput
                    label="Extension"
                    placeholder="ex: com"
                    value={tld}
                    onChange={v => handleChange('tld', v)}
                    required={props.required}
                />
            </View>
            {error && <AppText type='error'>{error}</AppText>}
        </View>
    );
};

export default AppEmailInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
    },
    error: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 5,
    },
});
