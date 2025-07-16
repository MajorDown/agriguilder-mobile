'use client'
import { AdminContext, ConnectedAdmin, Contestation, GuildConfig, MemberInterventions, MembersList } from "@/constants/Types";
import { getGuildMembers } from "@/utils/requests/forAdmin/getGuildMembers";
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";


/**
 * Contexte utilisé pour fournir et consommer l'état de l'admin connecté
 * à travers l'application.
 */
const adminContext: React.Context<AdminContext> = createContext<AdminContext>(
  {
    admin: null,
    updateAdmin: () => {},
    guildMembers: null,
    updateGuildMembers: () => {},
    guildConfig: null,
    updateGuildConfig: () => {},
    guildInterventions: null,
    updateGuildInterventions: () => {},
    guildContestations: null,
    updateGuildContestations: () => {}
  }
);

/**
 * simplifie l'accès et la mise à jour userContext dans les composants de l'application. 
 *
 * @returns {AdminContext} L'état actuel de l'admin et la fonction pour le mettre à jour.
 */
export function useAdminContext(): AdminContext {
  const context = useContext(adminContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de adminContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (admin) et au setter (updateAdmin) du adminContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte de l'admin.
 */
export const AdminProvider = (props: PropsWithChildren): ReactNode => {
  const [admin, updateAdmin] = useState<ConnectedAdmin | null>(null);
  const [guildMembers, updateGuildMembers] = useState<MembersList | null>(null);
  const [guildConfig, updateGuildConfig] = useState<GuildConfig | null>(null);
  const [guildInterventions, updateGuildInterventions] = useState<MemberInterventions | null>(null);
  const [guildContestations, updateGuildContestations] = useState<Contestation[] | null>(null);

  const fetchGuildMembers = async () => {
    const membersList = await getGuildMembers();
    if (membersList) updateGuildMembers(membersList);
    else updateGuildMembers(null);
  };

  useEffect(() => {
    fetchGuildMembers();
  }, [admin]);

  return (
    <adminContext.Provider value={{
      admin,
      updateAdmin,
      guildMembers,
      updateGuildMembers,
      guildConfig,
      updateGuildConfig,
      guildInterventions,
      updateGuildInterventions,
      guildContestations,
      updateGuildContestations

    }}>
      {props.children}
    </adminContext.Provider>
  );
};
