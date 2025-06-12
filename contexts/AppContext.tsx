import {FC, createContext, useContext, useState } from 'react';
import {ConnectedAdmin, ConnectedMember, GuildConfig, Intervention, Contestation} from '@/constants/Types';

type AppContextType = {
    admin: ConnectedAdmin | null;
    member: ConnectedMember | null;
    guildConfig: GuildConfig | null;
    interventions: Intervention[] | null;
    contestations: Contestation[] | null;
    updateAdmin: (admin: ConnectedAdmin | null) => void;
    updateMember: (member: ConnectedMember | null) => void;
    updateGuildConfig: (guildConfig: GuildConfig | null) => void;
    updateInterventions: (interventions: Intervention[] | null) => void;
    updateContestations: (contestations: Contestation[] | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [admin, updateAdmin] = useState<ConnectedAdmin | null>(null);
    const [member, updateMember] = useState<ConnectedMember | null>(null);
    const [guildConfig, updateGuildConfig] = useState<GuildConfig | null>(null);
    const [interventions, updateInterventions] = useState<Intervention[] | null>(null);
    const [contestations, updateContestations] = useState<Contestation[] | null>(null);

    return (
        <AppContext.Provider value={{ 
            admin, 
            member, 
            guildConfig, 
            interventions, 
            contestations, 
            updateAdmin, 
            updateMember, 
            updateGuildConfig, 
            updateInterventions, 
            updateContestations
        }}>
            {children}
        </AppContext.Provider>
    );
}