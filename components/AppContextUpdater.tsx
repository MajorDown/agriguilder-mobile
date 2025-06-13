import { ConnectedAdmin, ConnectedMember } from '@/constants/Types';
import { useAppContext } from '@/contexts/AppContext';
import SecureStoreManager from '@/utils/SecureStoreManager';
import getUserData from '@/utils/requests/getUserData';
import { useEffect } from 'react';

/**
 * @description Composant qui initialise et actualise automatiquement le contexte application
 * @returns {JSX.Element}
 */
const AppContextUpdater = () => {
    const {
        admin,
        member,
        updateAdmin,
        updateMember,
        updateGuildConfig,
        updateInterventions,
        updateContestations,
    } = useAppContext();

    const initUserData = async () => {
        try {
            // Récupération du user stocké
            const storedUser = await SecureStoreManager.loadUser();

            if (storedUser) {
                // si le storedUser est de type ConnectedAdmin (donc avec la propriété authPersistence), on actualise admin dans le context
                if ((storedUser as ConnectedAdmin).authPersistence) {
                    updateAdmin(storedUser as ConnectedAdmin);
                } else if ((storedUser as ConnectedMember).counter) {
                    // sinon, on actualise member dans le context
                    updateMember(storedUser as ConnectedMember);
                }
                // Mise à jour des autres données liées à l'utilisateur
                const { guildConfig, interventions, contestations } = await getUserData({ user: storedUser });
                updateGuildConfig(guildConfig);
                updateInterventions(interventions);
                updateContestations(contestations);
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation du contexte utilisateur :', error);
        }
    };
    
    const refreshUserData = async () => {
        const user = admin || member;
        if (!user) {
            updateGuildConfig(null);
            updateInterventions(null);
            updateContestations(null);
            return;
        }; // Pas d'utilisateur actif
        try {
            const { guildConfig, interventions, contestations } = await getUserData({ user });
            updateGuildConfig(guildConfig);
            updateInterventions(interventions);
            updateContestations(contestations);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données utilisateur :', error);
        }
    };

    useEffect(() => {
        initUserData();
    }, []); // <- Ne se lance qu'au tout premier render (démarrage de l'app)

    useEffect(() => {
        refreshUserData();
    }, [admin, member]); // <- Chaque fois qu'un user change (ex : login)

    return <></>; // Pas d'affichage
};

export default AppContextUpdater;
