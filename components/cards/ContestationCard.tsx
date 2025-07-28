import { Contestation } from "@/constants/Types";
import { Text, View } from "react-native";

type ContestationCardProps = {
    contestation: Contestation
}

const ContestationCard = () => {
    return (<View>
        <View>
            <Text>Contestation</Text>
        </View>
    </View>)
}

export default ContestationCard;