import * as SecureStore from 'expo-secure-store';

/**
 * @description Classe utilitaire pour gérer le stockage sécurisé du token d'authentification
 */
export class TokenManager {
  private static key = 'authToken';

  /**
   * Sauvegarde un token de manière sécurisée
   * @param token Le token JWT ou similaire à stocker
   */
  static async save(token: string): Promise<void> {
    await SecureStore.setItemAsync(this.key, token);
  }

  /**
   * Récupère le token stocké
   * @returns Le token s'il existe, sinon null
   */
  static async load(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.key);
  }

  /**
   * Supprime le token stocké
   */
  static async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key);
  }

  /**
   * Vérifie si un token est présent
   * @returns true si un token est stocké, sinon false
   */
  static async hasToken(): Promise<boolean> {
    const token = await this.load();
    return token !== null;
  }
}
