import { JSX, PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors'

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: Colors.global,
        marginTop: 10,
        marginBottom: 20,
    }
})

/**
 * Text personnalisé pour l'application
 * @param props.type - Type spécifique de texte (error, infos)
 * @returns 
 */
const AppTitle = (props: PropsWithChildren): JSX.Element => {

    return (
        <Text style={styles.title}>
            {props.children}
        </Text>
    );
}

export default AppTitle;