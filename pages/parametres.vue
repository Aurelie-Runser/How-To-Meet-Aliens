<template>
    <div>
        <NuxtLayout class="parametre" :class="`-main_color-${store.mainColor}`">
            <template #header>
                <h1>Paramètres</h1>
            </template>

            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/desktop">Bureau</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/historique">Historique</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <div v-if="user">
                <section class="parametre__section">
                    <h2>Compte</h2>

                    <form class="parametre__form" @submit.prevent="modifCompte" method="put">
                        <div class="parametre__form--inputs">
                            <div class="parametre__form--inputs_groupe">
                                <label for="pseudo">Pseudo</label>
                                <input type="text" name="pseudo" id="pseudo" maxlength="11" v-model="user.pseudo">
                            </div>
                            <div class="parametre__form--inputs_groupe">
                                <label for="mdp">Mot de Passe</label>
                                <input type="text" name="mdp" id="mdp" v-model="user.mdp">
                            </div>
                        </div>
                        <input class="global-form__bouton parametre__form--bouton" type="submit" value="Modifier">
                    </form>
                    <p v-if="message_compte">{{ message_compte }}</p>
                </section>
                
                <section class="parametre__bureau">
                    <h2>Bureau</h2>
                    
                    <form class="parametre__form" @submit.prevent="modifBureau" method="put" :class="modifTitre? '':'bureau__none'">
                        <div class="parametre__form--inputs">
                            <div class="parametre__form--inputs_groupe">
                                <label for="titre">Titre</label>
                                <input type="text" name="titre" id="titre" maxlength="25" v-model="user.titre">
                            </div>

                            <p class="parametre__form--note" v-if="modifTitre">Note : pour afficher votre pseudo dans le titre du bureau, écrivez : [pseudo]</p>

                            <div class="parametre__form--inputs_groupe" :class="(modifTheme || (modifTheme == modifTitre))? '':'bureau__none'">
                                <label for="mdp">Thème</label>
                                <select name="color" id="color" v-model="user.id_color">
                                    <option v-for="c in colors" :value="c.id_color">{{ c.nom }}</option>
                                </select>
                                <p class="bureau__none--texte" v-if="!(modifTheme || (modifTheme == modifTitre))">Débloquez 50% des fins pour accéder à ce paramètre.</p>
                            </div>
                        </div>
                        <input class="global-form__bouton parametre__form--bouton" type="submit" value="Modifier">
                        <p class="bureau__none--texte" v-if="!modifTitre">Réalisez une mission pour accéder à ces paramètres.</p>
                    </form>
                    <p v-if="message_bureau">{{ message_bureau }}</p>
                </section>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.parametre{
    
    &__section{
        margin-bottom: $ph-m-xl;
    }

    &__form{
        width: fit-content;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: $ph-m-md $ph-m-lg;

        &--note{
            max-width: 280px;
            margin: 0;
            margin-bottom: $ph-m-sm;
        }
        
        &--inputs{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: $ph-m-md;
            
            &_groupe{
                width: fit-content;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: $ph-m-sm;
    
                input{
                    width: auto;
                }
            }
        }

        &--bouton{
            margin: auto;
        }
    }


    @include medium{

        &__section{
            margin-bottom: $pc-m-xl2;
        }

        &__form{
            &--note{
                margin-bottom: $pc-m-sm;
            }
        }
        
        &__form{
            gap: $pc-m-lg;

            &--inputs{
                gap: $pc-m-sm;
                
                &_groupe{
                    gap: $pc-m-sm;
                }
            }
        }
    }
}

.bureau__none{
    position: relative;
    min-width: 280px;
    min-height: 100px;
    padding: $ph-m-sm $ph-m-md;
    background: rgba($c-bblack, 80%);
    cursor: not-allowed;
    
    > * {
        filter: brightness(20%);
        pointer-events: none;
    }

    &--texte{
        position: absolute;
        font-weight: $fw-bold;
        font-style: italic;
        color: $c-red;
        text-transform: uppercase;
        filter: brightness(100%);
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const colors = ref()
const user = ref()
const message_compte = ref()
const message_bureau = ref()

const modifTitre = ref(false)
if (store.raportsDebloques >= 1){
    modifTitre.value = true
}

const modifTheme = ref(false)
if (store.raportsDebloques >= 11){
    modifTheme.value = true
}

// récupération de la liste de toutes les couleurs
const getColors = async () => {
    try{
        const response = await API.get(`/colors`)
        colors.value = response.data

    } catch (error) {
        console.error("Erreur lors de la récupération de la liste des couleurs :", error.message)
    }
}

// récupération de la liste de tous les jours
const getUser = async () => {
    try{
        const response = await API.get(`/user/${store.token}`)
        user.value = response.data
    } catch (error) {
        console.error("Erreur lors de la récupération de l'user :", error.message)
    }
}

// modification des données du compte User
const modifCompte = async () => {
    try {
        const response = await API.put(`/user/modif_compte`, user.value);        

        if(response.data.message == "bien modif"){
            message_compte.value = "Les modifications ont bien été enregistrées."
            user.value.mdp = ''
        } else if(response.data.message == "aucune modif"){
            message_compte.value = "Il n'y a eu aucune modification."
            user.value.mdp = ''
        } else {
            message_compte.value = "Erreur lors de la modification."
        }
        
    } catch (error) {
        console.error("Erreur lors de la modification :", error.message)
        message_compte.value = "Erreur lors de la modification."
    }
}

// modification des données du bureau du User
const modifBureau = async () => {
    try {
        const response = await API.put(`/user/modif_bureau`, user.value);        

        if(response.data.message == "bien modif"){
            store.setUser(null, null, user.value.id_color, null)
            message_bureau.value = "Les modifications ont bien été enregistrées."
        } else if(response.data.message == "aucune modif"){
            message_bureau.value = "Il n'y a eu aucune modification."
        } else {
            message_bureau.value = "Erreur lors de la modification."
        }
        
    } catch (error) {
        console.error("Erreur lors de la modification :", error.message)
        message_bureau.value = "Erreur lors de la modification."
    }
}


// suppression du token pour déconnecter l'utilisateur
const deconnexion = async () => {
    store.clearToken()
    router.push('/login')
}

// chargement de la base de données
onMounted(async() => {
    await getColors()
    await getUser()
})

useSeoMeta({
    title: "Parametres - How To Meet Aliens ?",
    description: "Parametres du joueur du jeu narratif How To Meet Aliens ?",
    ogTitle: "How To Meet Aliens ? Page des Parametres",
    ogDescription: "Parametres du joueur du jeu narratif How To Meet Aliens ?",
    ogImage: "/how_to_meet_aliens_logo.png",
})

// renvoie l'user sur l'index s'il n'est pas connecté
definePageMeta({
    middleware: [
        function (to, from) {},
        'auth',
    ],
});
</script>