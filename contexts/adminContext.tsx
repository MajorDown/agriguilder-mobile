'use client'
import { AdminContext } from "@/constants/Types";
import useAdminData from "@/hooks/useAdminData";
import getGuildContestations from "@/utils/requests/forAdmin/getGuildContestations";
import getGuildConfig from "@/utils/requests/getGuildConfig";
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
    if (admin) {
      setLoading(true)
      // Récupération des membres de la guilde
      const membersList = await getGuildMembers();
      updateGuildMembers(membersList || null);
      // Récupération de la configuration de la guilde
      const config = await getGuildConfig(admin);
      updateGuildConfig(config || null);
      // Récupération des interventions des membres de la guilde
      // const interventions = await getGuildInterventions(admin);
      // updateGuildInterventions(interventions || null);
      // Récupération des contestations de la guilde
      const contestations = await getGuildContestations(admin);
      updateGuildContestations(contestations || null);
      setLoading(false);
    }
  };

  const reinitData = async () => {
    updateAdmin(null);
    updateGuildMembers(null);
    updateGuildConfig(null);
    updateGuildInterventions(null);
    updateGuildContestations(null);
  }

  useEffect(() => {
    admin && fetchData();
    !admin && reinitData();
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
      setLoading,
      refetchAll: fetchData
    }}>
      {props.children}
    </adminContext.Provider>
  );
};
