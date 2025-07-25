import { ConnectedAdmin, Intervention } from "@/constants/Types";

const apiKey = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api';

/**
 * @description Récupère les interventions de la guilde
 * @param {ConnectedAdmin} admin - L'admin connecté
 * @return {Promise<Intervention[] | null>} La liste des interventions ou null en cas d'erreur
 **/
const getGuildInterventions = async (
  admin: ConnectedAdmin
): Promise<Intervention[] | null> => {
  try {
    const response = await fetch(`${apiKey}/interventions/getAll`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${admin.token}`,
        "X-user-Mail": admin.mail,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`getGuildInterventions ~> Request failed with status ${response.status} : ${errorText}`);
    }

    const data = await response.json();
    return data.interventions as Intervention[];
  } catch (error) {
    console.error("getGuildInterventions ~> error :", error);
    return null;
  }
};

export default getGuildInterventions;
