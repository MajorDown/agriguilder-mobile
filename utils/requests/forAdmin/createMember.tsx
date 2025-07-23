import { ConnectedAdmin, NewMemberInfos } from "@/constants/Types";

const APIUrl = process.env.NEXT_PUBLIC_API_URL || "https://agriguilder.com/api";

/**
 * Effectue une requête POST vers l'endpoint "/api/member/signup" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const createMember = async (newMember: NewMemberInfos, admin: ConnectedAdmin): Promise<Response> => {
  try {
    const response = await fetch(`${APIUrl}/member/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${admin.token}`,
        'X-Auth-Email': admin.mail,
      },
      body: JSON.stringify(newMember),
    });
    if (!response.ok) {
      throw new Error(`createMember ~> Request failed with status ${response.status} : ${response.body}`);
    }
    return response;
  } catch (error: any) {
    console.log("createMember ~> Error:", error);
    throw new Error(`createMember ~> Error: ${error.message}`);
  }
};

export default createMember;