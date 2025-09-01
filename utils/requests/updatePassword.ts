import { useAdminContext } from "@/contexts/adminContext";
import { useMemberContext } from "@/contexts/memberContext";

const apiKey = process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api'

type Props = {
    oldPassword: string;
    newPassword: string;
}

const updatePassword = async (props: Props): Promise<void> => {
    const {admin} = useAdminContext();
    const {member} = useMemberContext();

    const req = {
        lastPassword: props.oldPassword,
        newPassword: props.newPassword,
        status: admin ? 'admin' : 'member',
        user: admin ? admin : member
    }

    try {
        const response = await fetch(`${apiKey}/password/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${admin?.token || member?.token}`,
            },
            body: JSON.stringify(req),
        });
        if (!response.ok) {
            throw new Error(`Erreur côté serveur: ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating password:", error);
    }
}

export default updatePassword;