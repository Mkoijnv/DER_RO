/**
 * Wrapper seguro para localStorage
 * Resolve problemas de acesso negado no Edge e modo privado
 */

class SafeStorage {
  constructor() {
    this.isAvailable = this.checkAvailability();
    this.memoryStorage = {}; // Fallback em memória
  }

  checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage indisponível, usando memória temporária');
      return false;
    }
  }

  setItem(key, value) {
    try {
      if (this.isAvailable) {
        localStorage.setItem(key, value);
      } else {
        this.memoryStorage[key] = value;
      }
    } catch (e) {
      this.memoryStorage[key] = value;
    }
  }

  getItem(key) {
    try {
      if (this.isAvailable) {
        return localStorage.getItem(key);
      } else {
        return this.memoryStorage[key] || null;
      }
    } catch (e) {
      return this.memoryStorage[key] || null;
    }
  }

  removeItem(key) {
    try {
      if (this.isAvailable) {
        localStorage.removeItem(key);
      } else {
        delete this.memoryStorage[key];
      }
    } catch (e) {
      delete this.memoryStorage[key];
    }
  }

  clear() {
    try {
      if (this.isAvailable) {
        localStorage.clear();
      } else {
        this.memoryStorage = {};
      }
    } catch (e) {
      this.memoryStorage = {};
    }
  }
}

const storage = new SafeStorage();
export default storage;

