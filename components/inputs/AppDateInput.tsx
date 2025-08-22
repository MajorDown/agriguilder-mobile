import AppColors from "@/constants/AppColors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DateInputProps = {
    value: string; // format 'YYYY-MM-DD'
    onChange: (newDate: string) => void;
    label?: string;
};

const getValidDate = (year: number, month: number, day: number): Date => {
    const d = new Date(year, month - 1, day);
    if (
        d.getFullYear() !== year ||
        d.getMonth() !== month - 1 ||
        d.getDate() !== day
    ) {
        // Date invalide : retourne la date la plus proche
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return new Date(year, month - 1, Math.min(day, lastDayOfMonth));
    }
    return d;
};

const formatDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/**
 * @description Composant de sélection de date
 * @param {DateInputProps} param0 - Les propriétés du composant
 * @returns {ReactNode} Le rendu du composant
 */
const DateInput = ({ value, onChange, label }: DateInputProps) => {
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2025);

    useEffect(() => {
        const [yyyy, mm, dd] = value.split("-").map(Number);
        setDay(dd);
        setMonth(mm);
        setYear(yyyy);
    }, [value]);

    const updateDate = (newDay: number, newMonth: number, newYear: number) => {
        const validDate = getValidDate(newYear, newMonth, newDay);
        setDay(validDate.getDate());
        setMonth(validDate.getMonth() + 1);
        setYear(validDate.getFullYear());
        onChange(formatDate(validDate));
    };

    const increment = (type: "day" | "month" | "year") => {
        if (type === "day") {
            const next = new Date(year, month - 1, day + 1);
            updateDate(next.getDate(), next.getMonth() + 1, next.getFullYear());
        }
        if (type === "month") {
            const next = new Date(year, month, 1); // mois suivant
            updateDate(day, next.getMonth() + 1, next.getFullYear());
        }
        if (type === "year") {
            updateDate(day, month, year + 1);
        }
    };

    const decrement = (type: "day" | "month" | "year") => {
        if (type === "day") {
            const prev = new Date(year, month - 1, day - 1);
            updateDate(prev.getDate(), prev.getMonth() + 1, prev.getFullYear());
        }
        if (type === "month") {
            const prev = new Date(year, month - 2, 1); // mois précédent
            updateDate(day, prev.getMonth() + 1, prev.getFullYear());
        }
        if (type === "year") {
            updateDate(day, month, year - 1);
        }
    };

    const renderColumn = (label: string, value: number, onInc: () => void, onDec: () => void) => (
        <View style={styles.column}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={onInc}><Text style={styles.arrow}>▲</Text></TouchableOpacity>
            <Text style={styles.value}>{value.toString().padStart(2, "0")}</Text>
            <TouchableOpacity onPress={onDec}><Text style={styles.arrow}>▼</Text></TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {label && <Text style={styles.title}>{label}</Text>}
            <View style={styles.row}>
                {renderColumn("Jour", day, () => increment("day"), () => decrement("day"))}
                {renderColumn("Mois", month, () => increment("month"), () => decrement("month"))}
                {renderColumn("Année", year, () => increment("year"), () => decrement("year"))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: "center", marginVertical: 10 },
    title: { fontSize: 16, marginBottom: 8, color: AppColors.global },
    row: { flexDirection: "row", justifyContent: "center", gap: 28, borderColor: AppColors.global, borderWidth: 1, padding: 4},
    column: { alignItems: "center" },
    arrow: { fontSize: 24, padding: 2, color: AppColors.global },
    value: { fontSize: 20, fontWeight: "bold", marginVertical: 4, color: AppColors.global },
    label: { fontSize: 12, color: AppColors.global },
});

export default DateInput;
