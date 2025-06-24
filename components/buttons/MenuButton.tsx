import AppColors from "@/constants/AppColors";
import AppTabs, { AppTab } from "@/constants/PagesLister";
import normaliseString from "@/utils/normaliseString";
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';
import { ReactNode, useState } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text } from "react-native";

type MenuButtonProps = {
    for: 'admin' | 'member' | 'user';
    name: string;
};

const MenuButton = (props: MenuButtonProps): ReactNode => {
    const router = useRouter();
    const tab = AppTabs.find(tab => tab.name === props.name) as AppTab;
    const [actualImage, setActualImage] = useState<ImageSourcePropType>(tab.inactive);

    const handlePress = () => {
        setActualImage(tab.active);
        router.push(`/${normaliseString(tab.name)}` as RelativePathString | ExternalPathString);
    }

    return (<Pressable style={styles.button} onPress={() => handlePress()}>
        <Image
            source={actualImage}
            style={styles.image}
        />
        <Text style={styles.text}>{props.name }</Text>
    </Pressable>)
}

export default MenuButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: 64,
        height: 64,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        color: AppColors.global,
    }
});