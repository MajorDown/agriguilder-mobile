import { ConnectedAdmin, Intervention } from "@/constants/Types";

const apiKey = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api';

/**
 * @description Récupère les interventions de la guilde
 * @param {ConnectedAdmin} L'admin connecté
 * @return {Promise<Intervention[] | null>} La liste des interventions de la guilde ou null en cas d'erreur
 **/
const getGuildInterventions = async (admin: ConnectedAdmin): Promise<Intervention[] | null> => {
    try {
        const response = await fetch(`${apiKey}/interventions/getAll?user=${admin.mail}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${admin.token}`,
                "X-user-Mail": admin.mail
            }
        });
        if (!response.ok) {
            throw new Error(`getGuildInterventions ~> Request failed with status ${response.status} : ${response.body}`);
        }
        const interventions: Intervention[] = await response.json();
        return interventions;
    } catch (error) {
        console.error("getGuildInterventions ~> error :", error);
        return null;
    }
};

export default getGuildInterventions;
