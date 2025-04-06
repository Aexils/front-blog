import {
  inject,
  signal,
  computed,
  runInInjectionContext,
  EnvironmentInjector
} from '@angular/core';
import { StorageService } from '../services/storage.service';

const tokenKey = 'auth_token';
const jwt = signal<string | null>(null);

let storageService: StorageService | null = null;

export const authStore = {
  token: jwt.asReadonly(),
  isLoggedIn: computed(() => !!jwt()),

  init(injector: EnvironmentInjector) {
    runInInjectionContext(injector, () => {
      storageService = inject(StorageService);
    });
  },

  setToken(authToken: string) {
    if (!storageService) {
      console.warn('[authStore] storageService not initialized');
      return;
    }

    jwt.set(authToken);
    storageService.setItem(tokenKey, authToken);
    console.log('[authStore] Token set:', jwt());
  },

  loadFromStorage() {
    if (!storageService) {
      console.warn('[authStore] loadFromStorage() called before init()');
      return;
    }

    const token = storageService.getItem<string>(tokenKey, false);
    console.log('[authStore] Token loaded from storage:', token);

    if (token) {
      jwt.set(token);
    }
  },

  logout() {
    if (!storageService) {
      console.warn('[authStore] logout() called before init()');
      return;
    }

    jwt.set(null);
    storageService.removeItem(tokenKey);
    console.log('[authStore] Logged out.');
  }
};
