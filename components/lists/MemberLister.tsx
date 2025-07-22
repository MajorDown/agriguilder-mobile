import { useAdminContext } from "@/contexts/adminContext";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MemberCard from "../cards/MemberCard";
import AppSelect from "../inputs/AppSelect";

type MemberListerProps = {
    mode: 'edit' | 'view';
    onSelectedMembersChange?: (selectedMembers: string[]) => void; // Fonction pour gérer les membres sélectionnés
}

const MemberLister = (props: MemberListerProps): ReactNode => {
    const { guildMembers } = useAdminContext();
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

    return (<View style={Styles.container}>
        <AppSelect
            placeholder="Sélectionnez un filtre"
            options={options}
            onSelect={(value: string | number) => setOrderBy(value as 'byName' | 'bycountasc' | 'bycountDesc')}
        />
        {orderedMembers?.map((member) => (
            <MemberCard 
                key={member.mail} 
                member={member} 
                mode={props.mode}
                onDelete={(member) => {}}
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
    }
})