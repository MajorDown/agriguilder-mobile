import PagesLister, { AppTab } from "@/constants/PagesLister";
import { useAppContext } from "@/contexts/AppContext";
import normaliseString from "@/utils/normaliseString";
import { Tabs } from "expo-router";
import TabsIcon from "./TabsIcon";

/**
 * @description Composant qui affiche les onglets de l'application en fonction du type d'utilisateur connecté.
 * @returns {JSX.Element} Les onglets de l'application.
 */
const AppTabs = () => {
    const { member, admin } = useAppContext();
    let validTabs: AppTab[] = [];
    if (admin) validTabs = PagesLister.filter((tab) => tab.for === 'admin' || tab.for === 'user');
    if (member) validTabs = PagesLister.filter((tab) => tab.for === 'member' || tab.for === 'user');

    return (<>
        {validTabs.length != 0 && validTabs.map((tab) => (
            <Tabs.Screen
                key={normaliseString(tab.name)}
                name={normaliseString(tab.name)}
                options={{
                    title: tab.title,
                    tabBarIcon: ({focused}) => <TabsIcon title={tab.name} isActive={focused}/>,
                }}
            />
        ))}
    </>)
}

export default AppTabs