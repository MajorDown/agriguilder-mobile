import { ConnectedAdmin, NewAdminInfos } from "@/constants/Types";

const APIUrl = process.env.NEXT_PUBLIC_API_URL || "https://agriguilder.com/api";

/**
 * Effectue une requête POST vers l'endpoint "/api/member/signup" avec les données fournies.
 * @param {FormData} formData - Les données du formulaire à envoyer.
 * @returns {Promise<Response | Error>} Une promesse qui résout avec l'objet Response en cas de réussite,
 * ou résout avec undefined en cas d'échec.
 */
const createAdmin = async (
  newAdmin: NewAdminInfos,
  admin: ConnectedAdmin
): Promise<any> => {
  console.log("createAdmin ~> Création d'un nouvel admin avec les infos :", newAdmin);
  console.log("createAdmin ~> Requête effectuée par l'admin connecté :", admin);
  try {
    const response = await fetch(`${APIUrl}/admin/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${admin.token}`,
        "X-admin-Mail": admin.mail,
      },
      body: JSON.stringify(newAdmin),
    });

    if (!response.ok) {
      const errorText = await response.text(); // utile si le backend ne renvoie pas du JSON
      throw new Error(`createAdmin ~> Request failed with status ${response.status} : ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("createAdmin ~> Error:", error);
    throw new Error(`createAdmin ~> Error: ${error.message}`);
  }
};

export default createAdmin;