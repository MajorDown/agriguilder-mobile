import AppColors from "@/constants/AppColors";
import { Contestation } from "@/constants/Types";
import normaliseDate from "@/utils/normaliseDate";
import { StyleSheet, Text, View } from "react-native";

type ContestationCardProps = {
    contestation: Contestation
}

const ContestationCard = (props: ContestationCardProps) => {
    return (<View style={Styles.card}>
        <View style={Styles.col}>
            <Text style={Styles.text}>le {normaliseDate(props.contestation.contestationDate)} par {props.contestation.contester}</Text>
            <Text style={Styles.text}>"{props.contestation.contesterMessage}"</Text>
        </View>
        <View style={Styles.conclusion}>
            <Text style={[Styles.text, 
                Styles[props.contestation.adminConclusion === 'accordé' ? 
                    'positif' : 'negatif']]}
            >
                {props.contestation.adminConclusion}
            </Text>
        </View>
    </View>)
}

export default ContestationCard;

const Styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: AppColors.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    col: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: 'Montserrat',
        color: AppColors.dark,
        fontWeight: '700',
        fontSize: 16,
        // si le text dépasse, il sera tronqué par '...'
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    conclusion: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        marginHorizontal: 'auto',
    },
    positif: {
        backgroundColor: AppColors.ok,
        borderRadius: 5,
        paddingHorizontal: 5,
        fontSize: 14
    },
    negatif: {
        backgroundColor: AppColors.error,
        borderRadius: 5,
        paddingHorizontal: 5,
        fontSize: 14
    },

});