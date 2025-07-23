import Colors from "@/constants/AppColors";
import { Member } from "@/constants/Types";
import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import MemberCard from "../cards/MemberCard";
import AppSelect from "../inputs/AppSelect";
import AppText from "../texts/AppText";

type MemberListerProps = {
    mode: 'edit' | 'view';
    onDeleteMember?: (member: Omit<Member, 'password'>) => void;
}

const MemberLister = (props: MemberListerProps): ReactNode => {
    const { guildMembers } = useAdminContext();
    const [wantnullishcounter, setWantNullishCounter] = useState<boolean>(false);
    const [orderBy, setOrderBy] = useState<'byName' | 'bycountasc' | 'bycountDesc'>('byName');
    const [orderedMembers, setOrderedMembers] = useState(guildMembers || []);

    const options = [
        { label: 'par ordre alphabétique', value: 'byName' },
        { label: 'par compteur croissant', value: 'bycountasc' },
        { label: 'par compteur décroissant', value: 'bycountDesc' },
    ]

    useEffect(() => {
        if (orderBy === 'byName') {
            setOrderedMembers([...orderedMembers].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (orderBy === 'bycountasc') {
            setOrderedMembers([...orderedMembers].sort((a, b) => a.counter - b.counter));
        } else if (orderBy === 'bycountDesc') {
            setOrderedMembers([...orderedMembers].sort((a, b) => b.counter - a.counter));
        }
    }, [orderBy, guildMembers]);

    useEffect(() => {
        if (!wantnullishcounter) {
            setOrderedMembers((guildMembers ?? []).filter(member => member.counter != 0));
        } else {
            setOrderedMembers(guildMembers ?? []);
        }
    }, [wantnullishcounter, guildMembers]);

    return (<View style={Styles.container}>
        <AppSelect
            placeholder="Sélectionnez un filtre"
            options={options}
            onSelect={(value: string | number) => setOrderBy(value as 'byName' | 'bycountasc' | 'bycountDesc')}
        />
        <View style={Styles.switchContainer}>
            <Switch
                value={wantnullishcounter}
                onValueChange={(value) => setWantNullishCounter(value)}
                trackColor={{ false: Colors.light, true: Colors.light }}
                thumbColor={wantnullishcounter ? Colors.ok : Colors.error}
            />
            <AppText>Masquer les membres dont le compteur est à zéro</AppText>
        </View>
        {orderedMembers?.map((member) => (
            <MemberCard 
                key={member.mail} 
                member={member} 
                mode={props.mode}
                onDelete={(member) => props.onDeleteMember?.(member)}
            />
        ))}
    </View>)
}

export default MemberLister;

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        gap: 10
    },
    switchContainer: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})