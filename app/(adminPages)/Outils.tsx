import AppPage from '@/components/AppPage';
import ToolCard from '@/components/outils/ToolCard';
import { useAdminContext } from '@/contexts/adminContext';

const Outils = () => {
    const { guildConfig } = useAdminContext();

    return (<AppPage adminOnly title="Les outils de la guilde">
        {guildConfig?.config.map((tool) => (
            <ToolCard key={tool.option} tool={tool} />
        ))}
    </AppPage>)
}

export default Outils;