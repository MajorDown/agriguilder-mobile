import AppColors from "@/constants/AppColors";
import { Member } from "@/constants/Types";
import { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type MemberForList = Omit<Member, 'password'>;

type MemberCardProps = {
    member: MemberForList
    mode: 'edit' | 'view'; // 'edit' pour modifier, 'view' pour visualiser
    onDelete?: (member: MemberForList) => void
}

const MemberCard = (props: MemberCardProps): ReactNode => {
    return (<View style={styles.card}>
        <Pressable style={styles.updateBtn}>
            <View style={styles.nameAndContact}>
                <Text style={[styles.text, styles.name]}>{props.member.name}</Text>
                <Text style={[styles.text, styles.contact]}>{props.member.mail} - {props.member.phone}</Text>
            </View>
            <View 
                style={[styles.solde, 
                    props.member.counter > 0 ? styles.positif : props.member.counter < 0 ? styles.negatif : {}
                ]}
            >
                <Text style={[styles.text]}>{props.member.counter} points</Text>
            </View>
        </Pressable>
        {props.mode === 'edit' && props.onDelete && <Pressable onPress={() => props.onDelete?.(props.member)}>
            <Image source={require('@/assets/images/icons/delete-white-green.png')} />
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
    updateBtn: {
        width: '85%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameAndContact: {
        width: '75%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        color: AppColors.dark,
    },
    name: {
        fontSize: 18,
    },
    contact: {
        fontSize: 12,
    },
    solde: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
    positif: {
        backgroundColor: AppColors.ok,
    },
    negatif: {
        backgroundColor: AppColors.error,
    },
    deleteBtn: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})