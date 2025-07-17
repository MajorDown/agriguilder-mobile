'use client'
import { AdminContext } from "@/constants/Types";
import useAdminData from "@/hooks/useAdminData";
import { getGuildMembers } from "@/utils/requests/getGuildMembers";
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
    updateGuildContestations: () => {},
    loading: false,
    setLoading: () => {}
  }
);

/**
 * simplifie l'accès et la mise à jour de adminContext dans les composants de l'application. 
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
  const [loading, setLoading] = useState<boolean>(true);
  const { admin, updateAdmin, guildMembers, updateGuildMembers, 
    guildConfig, updateGuildConfig, guildInterventions, updateGuildInterventions, 
    guildContestations, updateGuildContestations } = useAdminData();

  const fetchData = async () => {
    setLoading(true)
    // Récupération des membres de la guilde
    const membersList = await getGuildMembers();
    updateGuildMembers(membersList || null)
    // Récupération de la configuration de la guilde
    // Récupération des interventions des membres de la guilde
    // Récupération des contestations de la guilde
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
      updateGuildContestations,
      loading,
      setLoading

    }}>
      {props.children}
    </adminContext.Provider>
  );
};
