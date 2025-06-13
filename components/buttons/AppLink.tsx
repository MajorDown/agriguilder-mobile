import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';
import AppButton from './AppButton';

export type AppLinkProps = {
    href: RelativePathString | ExternalPathString;
    text: string;
}

/**
 * @description Composant de lien de l'application, permet de naviguer vers une autre page de l'application
 * @param props.href - le lien vers lequel naviguer
 * @param props.text - le texte à afficher sur le lien
 * @return JSX.Element
 */
const AppLink = (props: AppLinkProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(props.href as RelativePathString | ExternalPathString);
    }

    return (
        <AppButton type="light" text={props.text} onPress={() => handlePress()} />
    )
}

export default AppLink;