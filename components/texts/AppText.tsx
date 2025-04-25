import { JSX, PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors'

export type AppTextProps = PropsWithChildren<{
    type?: 'error' | 'infos'
}>

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '700',
        color: Colors.global,
        textAlign: 'center',
    }
})

/**
 * Text personnalisé pour l'application
 * @param props.type - Type spécifique de texte (error, infos)
 * @returns 
 */
const AppText = (props: AppTextProps): JSX.Element => {

    return (
        <Text style={[styles.text, props.type === 'error' ? { color: Colors.error } : props.type === 'infos' ? { color: Colors.ok } : {}]}>
            {props.children}
        </Text>
    );
}

export default AppText;