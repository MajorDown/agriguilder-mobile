import { ConnectedUser } from "@/constants/Types";
import DeviceIdManager from "@/utils/DeviceIdManager";

export type logUserProps = {
    userType: 'member' | 'admin';
    userMail: string;
    userPassword: string;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL_DEV || process.env.EXPO_PUBLIC_API_URL;

/**
 * @description Fonction pour s'authentifier grâce à l'API
 * @param props.userType - Le type d'utilisateur (membre ou admin)
 * @param props.userMail - L'adresse mail de l'utilisateur
 * @param props.userPassword - Le mot de passe de l'utilisateur
 * @param props.deviceId - L'identifiant du périphérique de l'utilisateur
 * @returns Un objet contenant les informations de l'utilisateur connecté
 * @throws Une erreur si la connexion échoue ou si la réponse du serveur est invalide
 */
const logUser = async (props: logUserProps): Promise<ConnectedUser> => {
    // récupération ou création de l'identifiant de périphérique
    const deviceId = await DeviceIdManager.getId() || DeviceIdManager.generate();
    // envoi de la requête de connexion à l'API
    const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userType: props.userType,
            userMail: props.userMail,
            userPassword: props.userPassword,
            deviceId: deviceId,
        }),
    });
    if (!response.ok) throw new Error(`Erreur de connexion : ${response.status} ${response.statusText}`);
    const data = await response.json();
    if (!data || data.error) throw new Error(`Erreur de connexion : ${data.error || 'Données invalides'}`);
    DeviceIdManager.storeId(deviceId); // enregistrement de l'identifiant de périphérique
    return data as ConnectedUser;
};

export default logUser;
