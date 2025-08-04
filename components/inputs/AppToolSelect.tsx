import AppColors from "@/constants/AppColors";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type AppToolSelectProps = {
    guildOptions: { option: string; coef: number }[];
    initialSelectedOptions?: string[];
    selectedOptions: (selected: string[]) => void;
};

const AppToolSelect = ({
    guildOptions,
    initialSelectedOptions = [],
    selectedOptions: onSelectionChange,
}: AppToolSelectProps) => {
    const [wantOptionsList, setWantOptionsList] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);

    const toggleOption = (option: string) => {
        const updated = selectedOptions.includes(option)
            ? selectedOptions.filter((opt) => opt !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updated);
        onSelectionChange(updated);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>
                    Renseignez les outils utilisés : ({selectedOptions.length} sélectionnée(s))
                </Text>
                <TouchableOpacity onPress={() => setWantOptionsList(!wantOptionsList)}>
                    <Text style={styles.arrow}>{wantOptionsList ? "▲" : "▼"}</Text>
                </TouchableOpacity>
            </View>

            {wantOptionsList && (
                <FlatList
                    data={guildOptions}
                    keyExtractor={(item) => item.option}
                    contentContainerStyle={styles.optionsList}
                    renderItem={({ item }) => {
                        const isChecked = selectedOptions.includes(item.option);
                        return (
                            <TouchableOpacity
                                style={[styles.option, isChecked && styles.checkedOption]}
                                onPress={() => toggleOption(item.option)}
                            >
                                <Text style={styles.checkIcon}>
                                    {isChecked ? "✔" : ""}
                                </Text>
                                <Text style={styles.optionText}>{item.option}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 10,
        width: "80%",
        borderColor: AppColors.global,
        borderWidth: 1,
        padding: 10
     },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    label: {
        fontSize: 16,
        flex: 1,
        paddingRight: 10,
        color: AppColors.global,
    },
    arrow: {
        fontSize: 22,
        padding: 6,
        color: AppColors.global
    },
    optionsList: {
        paddingVertical: 8,
        gap: 5,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: AppColors.global,
        padding: 10,
        marginHorizontal: 8,
        borderColor: AppColors.dark,
    },
    checkedOption: {
        backgroundColor: AppColors.light,
    },
    checkIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    optionText: {
        fontSize: 14,
    },
});

export default AppToolSelect;
