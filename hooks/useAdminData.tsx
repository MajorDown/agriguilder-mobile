import {
  Contestation,
  GuildConfig,
  MemberInterventions,
  MembersList,
} from "@/constants/Types";
import { useState } from "react";

/**
 * @description Hook pour gérer les données de la guilde coté admin
 * @returns {guildMembers, updateGuildMembers, guildConfig, 
 * updateGuildConfig, guildInterventions, updateGuildInterventions, 
 * guildContestations, updateGuildContestations}
 **/
const useGuildData = () => {
  const [guildMembers, updateGuildMembers] = useState<MembersList | null>(null);
  const [guildConfig, updateGuildConfig] = useState<GuildConfig | null>(null);
  const [guildInterventions, updateGuildInterventions] = useState<MemberInterventions | null>(null);
  const [guildContestations, updateGuildContestations] = useState<Contestation[] | null>(null);

  return {
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

export default useGuildData;