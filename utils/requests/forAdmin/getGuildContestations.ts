import { ConnectedAdmin, Contestation } from "@/constants/Types";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "https://agriguilder.com/api"; // Ensure you have a fallback or handle this appropriately

/**
 * @description Récupère les contestations de la guilde
 * @param {ConnectedAdmin} admin
 * @returns {Promise<Contestation[] | undefined>}
 */
const getGuildContestations = async (admin: ConnectedAdmin): Promise<Contestation[] | undefined> => {
  try {
    const response = await fetch(`${apiKey}/contestation/getAll?guildName=${encodeURIComponent(admin.guild)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${admin.token}`,
        'X-user-Mail': admin.mail,
      },
    });  
    if (!response.ok) {
      throw new Error(`getGuildContestations ~> Request failed with status ${response.status} : ${response.body}`);
    }  
    return response.json();
  } catch (error) {
    console.error("Error searching Contestations:", error);
    return undefined;
  }
};

export default getGuildContestations;