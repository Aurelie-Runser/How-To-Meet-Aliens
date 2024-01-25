import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null, // pour la connection
  }),
  actions: {

    // connecte l'utilisateur et garde la connexion
    setToken(token){
      if (token){
        this.token = token
        localStorage.setItem('Token de Connection', JSON.stringify(this.token))
        }
    },

    // déconnecte l'utilisateur
    clearToken() {
      this.token = null
      localStorage.setItem('Token de Connection', JSON.stringify(this.token))
    },
  },
});
