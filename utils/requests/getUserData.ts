import { ConnectedUser, Contestation, GuildConfig, Intervention } from '@/constants/Types';
import DeviceIdManager from '../DeviceIdManager';

export type GetUserDataProps = {
    user: ConnectedUser;
}

export type GetUserDataResponse = {
    guildConfig: GuildConfig;
    interventions: Intervention[];
    contestations: Contestation[];
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL_DEV || process.env.EXPO_PUBLIC_API_URL;

/**
 * @description Fonction pour récupérer les données relatives à l'utilisateur grâce à l'API
 * @param props.user - L'utilisateur connecté
 * @returns Un objet contenant les données de l'utilisateur
 * @throws Une erreur si la récupération échoue ou si la réponse du serveur est invalide
 */
const getUserData = async (props: GetUserDataProps): Promise<GetUserDataResponse>  => {
    // récupération de l'identifiant de périphérique
    const deviceId = await DeviceIdManager.getId();
    if (!deviceId) throw new Error('Identifiant de périphérique introuvable.');
    // requète de récupération des données utilisateur
    const response = await fetch(`${apiUrl}/data/getUserData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: props.user, deviceId }),
    });
    if (!response.ok) throw new Error(`Erreur de connexion : ${response.status} ${response.statusText}`);
    const data = await response.json();
    if (!data || data.error) throw new Error('Erreur dans la réponse du serveur.');
    return data as GetUserDataResponse;
}

export default getUserData;