import { ConnectedAdmin, ConnectedMember } from '@/constants/Types';
import * as SecureStore from 'expo-secure-store';

/**
 * @description Classe utilitaire pour gérer le stockage sécurisé du ConnectedUser
 */
class SecureStoreManager {
  private static adminkey = 'connected-user';
  private static memberkey = 'connected-member';

  // ADMIN

  /**
   * @description Stocke le ConnectedAdmin de manière sécurisée
   * @param {ConnectedAdmin} admin - L'objet ConnectedAdmin à stocker
   */
  static async storeAdmin(admin: ConnectedAdmin): Promise<void> {
    await SecureStore.setItemAsync(this.adminkey, JSON.stringify(admin));
  }

  /**
   * @description Charge le ConnectedAdmin stocké de manière sécurisée
   * @return {Promise<ConnectedAdmin | null>} Le ConnectedAdmin chargé ou null si aucun n'est trouvé
   * */
  static async loadAdmin(): Promise<ConnectedAdmin | null> {
    const jsonData = await SecureStore.getItemAsync(this.adminkey);
    return jsonData ? JSON.parse(jsonData) : null;
  }

  /**
   * @description Efface le ConnectedAdmin stocké de manière sécurisée
   * @return {Promise<void>} Une promesse qui se résout lorsque l'effacement est terminé
   */
  static async clearAdmin(): Promise<void> {
    await SecureStore.deleteItemAsync(this.adminkey);
  }

  // MEMBER

  /**
   * @description Stocke le ConnectedMember de manière sécurisée
   * @param {ConnectedMember} member - L'objet ConnectedMember à stocker
   */
  static async storeMember(member: ConnectedMember): Promise<void> {
    await SecureStore.setItemAsync(this.memberkey, JSON.stringify(member));
  }

  /**
   * @description Charge le ConnectedMember stocké de manière sécurisée
   * @return {Promise<ConnectedMember | null>} Le ConnectedMember chargé ou null si aucun n'est trouvé
   */
  static async loadMember(): Promise<ConnectedMember | null> {
    const jsonData = await SecureStore.getItemAsync(this.memberkey);
    return jsonData ? JSON.parse(jsonData) : null;
  }

  /**
   * @description Efface le ConnectedMember stocké de manière sécurisée
   * @return {Promise<void>} Une promesse qui se résout lorsque l'effacement est terminé
   */
  static async clearMember(): Promise<void> {
    await SecureStore.deleteItemAsync(this.memberkey);
  }

}

export default SecureStoreManager;