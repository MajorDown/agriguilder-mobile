import AppTitle from '@/components/texts/AppTitle';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

/*
* @description Header de l'application
* @return {JSX.Element}
*/
const Header = () => {

    const handleReturnHome = () => router.replace("/");

    return (<View style={Styles.header}>
        <Pressable onPress={handleReturnHome} style={Styles.headerTitle}>
            <Image
                source={require('@/assets/images/icons/logo-white.png')}
                style={{width: 35, height: 50}}
            />
            <AppTitle>Agriguilder</AppTitle>
        </Pressable>
    </View>)
}

const Styles = StyleSheet.create({
    header: {
        width: '100%',
        marginTop: 30,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    }
})

export default Header;