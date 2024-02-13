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
                <section class="parametre__compte">
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
                                <p class="bureau__none--texte" v-if="!(modifTheme || (modifTheme == modifTitre))">Débloquez 25% du jeu pour accéder à ce paramètre.</p>
                            </div>
                        </div>
                        <input class="global-form__bouton parametre__form--bouton" type="submit" value="Modifier">
                        <p class="bureau__none--texte" v-if="!modifTitre">Réalisez une mission pour accéder à ces paramètres.</p>
                    </form>
                    <p v-if="message_bureau">{{ message_bureau }}</p>
                </section>

                <section class="parametre__danger">
                    <h2 class="parametre__danger--titre">Danger Zone</h2>

                    <myButton v-if="store.mainColor != 2" type="t_button" color="main_color-2" @click="isSuppCompte = true">Supprimer mon Compte</myButton>
                    <myButton v-else type="t_button" color="main_color-4" @click="isSuppCompte = true">Supprimer mon Compte</myButton>

                    <div v-if="isSuppCompte" class="parametre__danger--popup">
                        <p class="parametre__danger--popup__texte">Vous perdriez toutes les missions que vous avez effectuées, les rapports débloqués et les médailles gagnées. Votre pseudo pourra être utilisé par un nouvel utilisateur.</p>
                        <p class="parametre__danger--popup__texte">Pour supprimer définitivement votre compte, écrivez <span class="parametre__danger--popup__texte--value">Supp{{ user.pseudo }}</span></p>

                        <div class="parametre__danger--popup__inputs">
                            <input type="text" name="supp" id="supp" v-model="user.supp">
                            <myButton type="t_button" color="main_color-7" @click="suppCompte()">Supprimer</myButton>
                        </div>

                        <div class="parametre__danger--popup__button">
                            <myButton type="t_button" size="big" color="main_color-6" @click="isSuppCompte = false">Annuler</myButton>
                        </div>
                    </div>
                </section>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.parametre{
    position: relative;
    
    &__bureau{
        margin: $ph-m-xl 0;
    }

    &__danger{
        border-top: $c-red solid 2px;
        padding: $ph-m-lg 0;

        &--titre{
            color: $c-red !important;
        }

        &--popup{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
            width: 100%;
            max-width: 800px;
            padding: $pc-m-sm;
            background-color: $c-red;
            border: darken($c-red, 30%) 5px solid;

            &__texte{
                color: $c-white;
                font-weight: $fw-bold;

                &--value{
                    color: $c-bblack;
                    user-select: none;
                }
            }

            &__inputs{
                display: flex;
                flex-wrap: wrap;
                gap: $ph-m-sm;
                width: fit-content;
                margin: auto;

                input{
                    max-width: 300px;
                    border: $c-white 2px solid;
    
                    &:focus{
                        outline-color: $c-white;
                    }
                }
            }

            &__button{
                width: fit-content;
                margin: $ph-m-md auto;
            }
        }
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

        &__bureau{
            margin: $pc-m-xl2 0;
        }

        &__danger{
            padding: $pc-m-lg 0;

            &--popup{
                bottom: 50%;
                transform: translate(-50%, 50%);

                &__inputs{
                    gap: $pc-m-sm;
                }

                &__button{
                    margin: $pc-m-md auto;
                }
            }
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

    &.-main_color-2{

        .parametre__danger{
            border-color: $c-pink;
            
            &--titre{
                color: $c-pink !important;
            }

            &--popup{
                background: darken($c-pink, 10%);
                border-color: darken($c-pink, 30%);
            }
        }
    }
    
    &.-main_color-2,
    &.-main_color-3,
    &.-main_color-4,
    &.-main_color-5,
    &.-main_color-6{
        h2{
            color: $c-white;
        }

        .parametre__danger{

            &--popup{

                &__texte{
                    color: $c-white;
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

const isSuppCompte = ref(false)

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

const suppCompte = async() => {
    // console.log()
    if (user.value.supp == `Supp${user.value.pseudo}`){
        try {
            const response = await API.delete(`/user/${store.token}/supp`);        
    
            if(response.data.message == "user supprime"){
                store.clearToken()
                router.push('/')
            }
            
        } catch (error) {
            console.error("Erreur lors de la supression :", error.message)
        }
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