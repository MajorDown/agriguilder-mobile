import SecureStorenManager from "./SecureStoreManager";

class DeviceIdManager {

    /**
     * @description Génère un identifiant de périphérique aléatoire
     * @returns Un identifiant de périphérique sous la forme DXXXXXXXXXXXXXXX
     */
    private static generateId(): string {
        const randomDigits = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
        return `D${randomDigits}`;
    }

    /**
     * @description Récupère l'identifiant de périphérique stocké
     * @returns L'identifiant de périphérique existant ou null
     */
    public static async getId(): Promise<string | null> {
        // Vérifie si un identifiant de périphérique est déjà stocké
        const deviceId = await SecureStorenManager.loadDeviceId();   
        if (deviceId) return deviceId; // Retourne l'identifiant de périphérique existant
        else return null;    
    }

    /**
     * @description Stocke l'identifiant de périphérique de manière sécurisée
     * @param deviceId L'identifiant de périphérique à stocker
     */
    public static async createAndStoreId(): Promise<void> {
        const deviceId = this.generateId(); // Génère un nouvel identifiant de périphérique
        await SecureStorenManager.storeDeviceId(deviceId); // Stocke l'identifiant de manière sécurisée
    }

}

export default DeviceIdManager;

