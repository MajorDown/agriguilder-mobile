import { ConnectedAdmin, GuildConfig } from "@/constants/Types";

const apiKey = process.env.NEXT_PUBLIC_API_URL || "https://agriguilder.com/api";

/**
 * Met à jour la configuration de la guilde via une requête PUT.
 * 
 * @param admin - L'admin connecté (utilisé pour l'authentification).
 * @param updatedGuildConfig - La nouvelle configuration à appliquer.
 * @returns Une réponse `Response` si la requête réussit.
 * @throws Une `Error` si la requête échoue.
 */
const updateGuildConfig = async (
  admin: ConnectedAdmin,
  updatedGuildConfig: GuildConfig
): Promise<Response> => {
  try {
    const response = await fetch(`${apiKey}/guildConfig/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${admin.token}`,
        "X-Auth-Email": admin.mail,
      },
      body: JSON.stringify(updatedGuildConfig),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No response body");
      throw new Error(`updateGuildConfig failed [${response.status}]: ${errorText}`);
    }

    return response;
  } catch (error: any) {
    console.error("updateGuildConfig ~> Error:", error);
    throw new Error(error?.message || "Erreur inconnue lors de la mise à jour de la configuration");
  }
};

export default updateGuildConfig;
