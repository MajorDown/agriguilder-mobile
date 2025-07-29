/*
 * fonction pour transformer un Date "YYYY-MM-DD-HH-MM-SS-MMM" au format "DD-MM-YYYY à HH:MM"
*/
const normaliseDate = (date: string): string => {
    const [year, month, day, hours, minutes] = date.split('-');
    return `${day}-${month}-${year} à ${hours}:${minutes}`;
};

export default normaliseDate;