import { ConnectedAdmin, ConnectedMember, MembersList } from "@/constants/Types";
import SecureStoreManager from "@/utils/SecureStoreManager";

const apiKey = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api'

/**
 * @description récupère une liste des membres de sa guilde.
 * @param {ConnectedAdmin | ConnectedMember} user - L'objet contenant les informations de connexion.
 **/
export const getGuildMembers = async (): Promise<MembersList | null> => {
    try {
        const admin = await SecureStoreManager.loadAdmin();
        const member = await SecureStoreManager.loadMember();
        const user = admin || member;
        if (!user) {
            throw new Error("Aucun utilisateur connecté");
        }
        const response = await fetch(`${apiKey}/guild/${user.guild}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'X-user-Email': user.mail,
                'X-role': user.hasOwnProperty('counter') ? 'member' : 'admin',
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur côté serveur: ${response.status}`);
        }
        if (response.status === 204) {
            return null;
        }
        const membersList: MembersList = await response.json();
        return membersList;
    } catch (error) {
        console.error(error);
        return null;
    }
}