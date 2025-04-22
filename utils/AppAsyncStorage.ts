import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConnectedUser } from '@/constants/Types';

const storageKey = 'Agriguilder_user';

/**
 * @description obtiens l'utilisateur connecté depuis AsyncStorage
 * @returns l'utilisateur connecté ou null si aucun utilisateur n'est connecté
 */
export const getUser = async (): Promise<ConnectedUser | null> => {
    try {
        const value = await AsyncStorage.getItem(storageKey);
        if (value !== null) {
            const user = JSON.parse(value) as ConnectedUser;
            return user;
        }
    } catch (e) {
        console.error('Error getting user from AsyncStorage', e);
    }
    return null;
}

/**
 * @description stocke l'utilisateur connecté dans AsyncStorage
 * @param user l'utilisateur connecté à stocker
 * @return true si l'utilisateur a été stocké avec succès, false sinon
 */
export const storeUser = async (user: ConnectedUser): Promise<boolean> => {
    try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem(storageKey, jsonValue);
        return true;
    } catch (e) {
        console.error('Error storing user in AsyncStorage', e);
        return false;
    }
}