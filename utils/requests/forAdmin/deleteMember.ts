import { ConnectedAdmin, UserMail } from "@/constants/Types";

const APIUrl = process.env.NEXT_PUBLIC_API_URL || "https://agriguilder.com/api";

/**
 * Supprime un membre
 * 
 * @param {UserMail} memberMail
 * @param {ConnectedAdmin} admin
 * @returns {Promise<Response | Error>}
 */
const deleteMember = async (memberMail: UserMail, admin: ConnectedAdmin): Promise<Response> => {
    try {
        // Ajoutez memberMail comme paramètre dans l'URL
        const url = `${APIUrl}/member/delete/`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${admin.token}`,
                "X-admin-Mail": `${admin.mail}`,
                "X-memberToDelete-Mail": `${memberMail}`,
            },
        })  
        if (!response.ok) {
            throw new Error(`deleteMember ~> Request failed with status ${response.status} : ${response.statusText}`);
        }  
        return response;
    } catch (error:any) {
    console.error("deleteMember ~> Error:", error);
    throw new Error(error?.message || "Erreur inconnue lors de la suppression du membre");
    }
};

export default deleteMember;