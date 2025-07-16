import { ConnectedUser } from '@/constants/Types';
import * as SecureStore from 'expo-secure-store';

/**
 * @description Classe utilitaire pour gérer le stockage sécurisé du ConnectedUser
 */
class SecureStorenManager {
  private static key = 'connected-user-data';

  /**
   * Sauvegarde un token de manière sécurisée
   * @param token Le token JWT ou similaire à stocker
   */
  static async storeUser(user: ConnectedUser): Promise<void> {
    await SecureStore.setItemAsync(this.key, JSON.stringify(user));
  }

  /**
   * Récupère le token stocké
   * @returns Le token s'il existe, sinon null
   */
  static async loadUser(): Promise<ConnectedUser | null> {
    const jsonData = await SecureStore.getItemAsync(this.key);
    return jsonData ? JSON.parse(jsonData) : null;
  }

  /**
   * Supprime le token stocké
   */
  static async clearUser(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key);
  }
}

export default SecureStorenManager;