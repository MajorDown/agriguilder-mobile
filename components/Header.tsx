import {Image, View, Pressable, StyleSheet} from 'react-native';
import { router } from 'expo-router';
import AppTitle from '@/components/texts/AppTitle';

/*
* @description Header de l'application
* @return {JSX.Element}
*/
const Header = (): JSX.Element => {

    const handleReturnHome = () => router.replace("/(main)");

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
    }
})

export default Header;