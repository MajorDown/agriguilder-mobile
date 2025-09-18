import { ConnectedAdmin } from "@/constants/Types";

const APIUrl = process.env.NEXT_PUBLIC_API_URL || "https://agriguilder.com/api";

type ResetGuildCountsDTO = {
    admin: ConnectedAdmin;
    reAskedPassword: string;
    wantToResetInterventions: boolean;
}

const ResetGuildCounts = async (props: ResetGuildCountsDTO): Promise<void> => {
    const reqBody = {
        reAskedPassword: props.reAskedPassword,
        guildToReset: props.admin.guild,
        resetInterventions: props.wantToResetInterventions
    }
    try {
        const response = await fetch(`${APIUrl}/counts/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": `${props.admin.mail}`,
                "Authorization": `Bearer ${props.admin.token}`
            },
            body: JSON.stringify(reqBody)
        });
        if (!response.ok) {
            const errorText = await response.text(); // utile si le backend ne renvoie pas du JSON
            throw new Error(`resetGuildsCounts ~> Request failed with status ${response.status} : ${errorText}`);
        }
    }
    catch (error: any) {
        console.log("resetGuildsCounts ~> Error:", error);
        throw new Error(`resetGuildsCounts ~> Error: ${error.message}`);
    }
}

export default ResetGuildCounts;