'use client'
import { ConnectedMember, Contestation, GuildConfig, MemberContext, MemberInterventions, MembersList } from "@/constants/Types";
import { getGuildMembers } from "@/utils/requests/getGuildMembers";
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";

/**
 * Contexte utilisé pour fournir et consommer l'état de l'utilisateur connecté
 * à travers l'application.
 */
const memberContext: React.Context<MemberContext> = createContext<MemberContext>(
  {
    member: null, 
    updateMember: () => {},
    interventions: null,
    updateInterventions: () => {},
    contestations: null,
    updateContestations: () => {},
    guildConfig: null,
    updateGuildConfig: () => {},
    guildMembers: null,
    updateGuildMembers: () => {},
    loading: false,
    setLoading: () => {}
  }
);

/**
 * simplifie l'accès et la mise à jour userContext dans les composants de l'application. 
 *
 * @returns {UserContext} L'état actuel de l'utilisateur et la fonction pour le mettre à jour.
 */
export function useMemberContext(): MemberContext {
  const context = useContext(memberContext);
  return context;
}

/**
 * englobe les composants enfants dans l'application et fournit
 * l'état de userContext à travers un contexte React. Il utilise un hook d'état pour
 * accéder au getter (user) et au setter (updateUser) du userContext.
 *
 * @param {PropsWithChildren} props Les props du composant, y compris les enfants à rendre.
 * @returns {JSX.Element} Un composant Provider qui englobe les enfants avec le contexte de l'utilisateur.
 */
export const MemberProvider = (props: PropsWithChildren): ReactNode => {
  const [member, updateMember] = useState<ConnectedMember | null>(null);
  const [interventions, updateInterventions] = useState<MemberInterventions | null>(null);
  const [contestations, updateContestations] = useState<Contestation[] | null>(null);
  const [guildConfig, updateGuildConfig] = useState<GuildConfig | null>(null);
  const [guildMembers, updateGuildMembers] = useState<MembersList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGuildMembers = async () => {
    const membersList = await getGuildMembers();
    if (membersList) updateGuildMembers(membersList);
    else updateGuildMembers(null);
  };

  useEffect(() => {
    setLoading(true);
    fetchGuildMembers();
    setLoading(false);
  }, [member]);

  return (
    <memberContext.Provider value={{
      member, 
      updateMember, 
      interventions, 
      updateInterventions, 
      contestations, 
      updateContestations, 
      guildConfig, 
      updateGuildConfig, 
      guildMembers, 
      updateGuildMembers,
      loading,
      setLoading
    }}>
      {props.children}
    </memberContext.Provider>
  );
};
