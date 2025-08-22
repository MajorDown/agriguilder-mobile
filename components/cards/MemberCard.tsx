import AppColors from "@/constants/AppColors";
import { Member } from "@/constants/Types";
import { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type MemberCardProps = {
    member: Member
    mode: 'edit' | 'view'; // 'edit' pour modifier, 'view' pour visualiser
    onDelete?: (member: Member) => void
}

/**
 * @description Carte affichant un membre
 * @param props.member - Le membre à afficher
 * @param props.mode - Le mode d'affichage ('edit' pour modifier, 'view' pour visualiser)
 * @param props.onDelete - Fonction pour supprimer le membre (optionnel, uniquement en mode 'edit')
 * @returns 
 */
const MemberCard = (props: MemberCardProps): ReactNode => {
    return (<View style={styles.card}>
        <View style={styles.infos}>
            <View style={styles.nameAndContact}>
                <Text style={[styles.text, styles.name]}>{props.member.name}</Text>
                <Text style={[styles.text, styles.contact]}>{props.member.mail} - {props.member.phone}</Text>
            </View>
            <View 
                style={[styles.solde, 
                    props.member.counter > 0 ? styles.positif : props.member.counter < 0 ? styles.negatif : {}
                ]}
            >
                <Text style={[styles.text]}>{props.member.counter.toFixed(2)} points</Text>
            </View>
        </View>
        {props.mode === 'edit' && <Pressable style={styles.deleteBtn} onPress={() => props.onDelete?.(props.member)}>
            <Image 
                source={require('@/assets/images/icons/delete-white-green.png')}
                style={{ width: 24, height: 24 }} 
            />
        </Pressable>}
    </View>);
}

export default MemberCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: AppColors.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infos: {
        width: '90%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameAndContact: {
        width: '75%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        color: AppColors.dark,
    },
    name: {
        fontSize: 16,
    },
    contact: {
        fontSize: 12,
    },
    solde: {
        // width: '25%',
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
    },
    negatif: {
        backgroundColor: AppColors.error,
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    deleteBtn: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})