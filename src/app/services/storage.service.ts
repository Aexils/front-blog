import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service pour gérer en toute sécurité le localStorage dans les applications Angular.
 * Compatible avec le rendu côté serveur (SSR).
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Vérifie si le localStorage est disponible dans l'environnement actuel
   */
  private get isLocalStorageAvailable(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Enregistre une valeur dans le localStorage
   * @param key Clé de stockage
   * @param value Valeur à stocker (sera convertie en JSON)
   * @returns true si le stockage a réussi, false sinon
   */
  setItem(key: string, value: any): boolean {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (e) {
      console.error('Erreur lors de l\'enregistrement dans localStorage:', e);
      return false;
    }
  }

  /**
   * Récupère une valeur depuis le localStorage
   * @param key Clé de stockage
   * @param parseJson Si true, tente de parser la valeur comme du JSON
   * @returns La valeur stockée ou null si non trouvée
   */
  getItem<T>(key: string, parseJson: boolean = true): T | string | null {
    if (!this.isLocalStorageAvailable) {
      return null;
    }

    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return null;
      }

      if (parseJson) {
        try {
          return JSON.parse(item) as T;
        } catch {
          return item;
        }
      }

      return item;
    } catch (e) {
      console.error('Erreur lors de la récupération depuis localStorage:', e);
      return null;
    }
  }

  /**
   * Supprime un élément du localStorage
   * @param key Clé de l'élément à supprimer
   * @returns true si la suppression a réussi, false sinon
   */
  removeItem(key: string): boolean {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Erreur lors de la suppression depuis localStorage:', e);
      return false;
    }
  }

  /**
   * Vide complètement le localStorage
   * @returns true si l'opération a réussi, false sinon
   */
  clear(): boolean {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Erreur lors du vidage du localStorage:', e);
      return false;
    }
  }

  /**
   * Vérifie si une clé existe dans le localStorage
   * @param key Clé à vérifier
   * @returns true si la clé existe, false sinon
   */
  hasItem(key: string): boolean {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }
}
