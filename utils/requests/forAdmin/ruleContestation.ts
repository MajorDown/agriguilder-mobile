import { ConnectedAdmin, Contestation } from "@/constants/Types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api';

/**
 * Envoie la décision d'un admin concernant une contestation.
 * @param admin - Admin connecté avec token
 * @param updatedContestation - L'objet Contestation modifié à envoyer
 * @returns La contestation mise à jour depuis le serveur
 * @throws Une erreur si la requête échoue
 */
export const ruleContestation = async (
    admin: ConnectedAdmin,
    updatedContestation: Contestation
): Promise<Contestation> => {
    try {
        const response = await fetch(`${apiUrl}/interventions/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${admin.token}`,
                'X-admin-Email': admin.mail,
            },
            body: JSON.stringify(updatedContestation),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errText}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.error("ruleContestation ~> Échec de l'envoi :", err);
        throw err;
    }
};
