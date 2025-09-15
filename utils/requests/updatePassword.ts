// utils/requests/updatePassword.ts
const apiKey =
  process.env.EXPO_PUBLIC_API_URL || 'https://agriguilder.com/api';

export type UpdatePasswordParams = {
  oldPassword: string;
  newPassword: string;
  token: string;
  status: 'admin' | 'member';
  mail: string;
};

export default async function updatePassword({
  oldPassword,
  newPassword,
  token,
  status,
  mail,
}: UpdatePasswordParams): Promise<void> {
  const body = {
    lastPassword: oldPassword,
    newPassword,
    status,
    user: { mail },
  };

  console.log('Mise à jour du mot de passe:', body);
  const res = await fetch(`${apiKey}/password/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `Erreur côté serveur: ${res.status}`);
  }
}
