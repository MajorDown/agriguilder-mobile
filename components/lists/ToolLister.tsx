import ToolCard from "@/components/cards/ToolCard";
import { Tool } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type ToolListerProps = {
    onToolEdit: (tool: Tool) => void;
}

const ToolLister = (props: ToolListerProps): ReactNode => {
    const { guildConfig } = useAdminContext();

    console.log('config dans ToolLister :', guildConfig);
    return (<View style={style.container}>
        {guildConfig?.config.map((tool) => (
            <ToolCard 
                key={tool.option} 
                tool={tool} 
                onPress={(tool) => props.onToolEdit(tool)}
            />
        ))}
    </View>)
}

export default ToolLister;

const style = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
        gap: 10
    }
})