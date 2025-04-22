/**
 * 
 * @param str {string} - le string à normaliser
 * @description Normalise une chaîne de caractères en supprimant les accents et en la mettant en minuscule
 * @returns {string} - la chaîne normalisée
 */
function normalizeString(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
  
export default normalizeString;