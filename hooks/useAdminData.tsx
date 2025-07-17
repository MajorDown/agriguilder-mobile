import {
  ConnectedAdmin,
  Contestation,
  GuildConfig,
  MemberInterventions,
  MembersList,
} from "@/constants/Types";
import { useState } from "react";

/**
 * @description Hook pour gérer les données coté admin
 * @returns {admin, updateAdmin, guildMembers, updateGuildMembers, guildConfig, 
 * updateGuildConfig, guildInterventions, updateGuildInterventions, 
 * guildContestations, updateGuildContestations}
 **/
const useAdminData = () => {
  
  const [admin, updateAdmin] = useState<ConnectedAdmin | null>(null);
  const [guildMembers, updateGuildMembers] = useState<MembersList | null>(null);
  const [guildConfig, updateGuildConfig] = useState<GuildConfig | null>(null);
  const [guildInterventions, updateGuildInterventions] = useState<MemberInterventions | null>(null);
  const [guildContestations, updateGuildContestations] = useState<Contestation[] | null>(null);

  return {
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
  };
};

export default useAdminData;