import { ConnectedUser } from "@/constants/Types";

export type ConnectUserProps = {
    userType: 'member' | 'admin';
    userMail: string;
    userPassword: string;
};

/**
 * @description Fonction pour s'authentifier grâce à l'API
 * @param props.userType - Le type d'utilisateur (membre ou admin)
 * @param props.userMail - L'adresse mail de l'utilisateur
 * @param props.userPassword - Le mot de passe de l'utilisateur
 * @returns Un objet contenant les informations de l'utilisateur connecté
 * @throws Une erreur si la connexion échoue ou si la réponse du serveur est invalide
 */
const connectUser = async (props: ConnectUserProps): Promise<ConnectedUser> => {
    const response = await fetch('https://agriguilder.com/api/mobile/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
    });
    if (!response.ok) throw new Error(`Erreur de connexion : ${response.status} ${response.statusText}`);
    const data = await response.json();
    if (!data || data.error) throw new Error('Erreur dans la réponse du serveur.');
    return data as ConnectedUser;
};

export default connectUser;
