import { ConnectedAdmin, ConnectedMember, GuildConfig } from "@/constants/Types";

const apiKey = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api';

/**
 * @description Récupère la configuration de la guilde
 * @param {ConnectedAdmin | ConnectedMember} user
 * @returns {Promise<Response | unknown>}
 */
const getGuildConfig = async (user: ConnectedAdmin | ConnectedMember): Promise<GuildConfig | null> => {
    try {
        const response = await fetch(`${apiKey}/guildConfig/get?guildName=${encodeURIComponent(user.guild)}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'X-user-EMail': user.mail,
                'X-user-Role': user.hasOwnProperty('counter') ? 'member' : 'admin'
            },
        });  
        if (!response.ok) {
            throw new Error(`getGuildConfig ~> Request failed with status ${response.status} : ${response.body}`);
        }  
        return response.json();
    } catch (error) {
        console.error("Error searching guildConfig:", error);
        return null;
    }
};

export default getGuildConfig;