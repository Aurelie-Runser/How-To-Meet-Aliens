import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null, // pour la connexion

    mainColor: 1,
    raportsDebloques: 0,
  }),
  actions: {

    // connecte l'utilisateur et garde la connexion
    setUser(token, color, rapports){
      if (token != null){
        this.token = token
        localStorage.setItem('Token de Connexion', JSON.stringify(this.token))
      }
      if(color != null){
        this.mainColor = color;
        localStorage.setItem('Theme', this.mainColor)
      }
      if(rapports != null){
        this.raportsDebloques = rapports;
        localStorage.setItem('Rapports Débloqués', this.raportsDebloques)
      }
    },

    // déconnecte l'utilisateur
    clearToken(){
      this.token = null
      this.mainColor = null
      localStorage.setItem('Token de Connexion', this.token);
      localStorage.removeItem('Token de Connexion');
      localStorage.setItem('Theme', this.mainColor);
      localStorage.removeItem('Theme');
      localStorage.setItem('Rapports Débloqués', this.raportsDebloques);
      localStorage.removeItem('Rapports Débloqués');
    },
  },
});
