import { ConnectedAdmin } from "@/constants/Types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api';

/**
 * Supprime une déclaration d'intervention suite à une contestation.
 * @param admin - L'admin connecté
 * @param contestationDate - La date unique identifiant la contestation
 * @returns Un message de succès ou une erreur
 */
export const deleteDeclaration = async (
    admin: ConnectedAdmin,
    contestationDate: string
): Promise<string> => {
    try {
        const response = await fetch(`${apiUrl}/interventions/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${admin.token}`,
                'X-admin-Email': admin.mail,
                'X-contestation': contestationDate
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erreur inconnue lors de la suppression');
        }

        return data.message || 'Intervention supprimée avec succès';
    } catch (err) {
        console.error("deleteDeclaration ~> Erreur :", err);
        throw err;
    }
};
