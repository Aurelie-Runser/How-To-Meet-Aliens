<template>
    <div>
        <NuxtLayout class="parametre" :class="`global_color-${store.mainColor}`">
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Paramètres</h2>
            </template>

            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/desktop">Bureau</myButton>
                    <myButton type="t_button" link="/historique">Historique</myButton>
                    <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <div v-if="user">
                <section class="parametre__section">
                    <h3>Compte</h3>

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
                        <input class="parametre__form--bouton" type="submit" value="Modifier">
                    </form>
                    <p v-if="message">{{ message }}</p>
                </section>
                
                <section>
                    <h3>Bureau</h3>

                    <form class="parametre__form" @submit.prevent="modifBureau" method="put">
                        <div class="parametre__form--inputs">
                            <div class="parametre__form--inputs_groupe">
                                <label for="pseudo">Thème</label>
                                <select name="color" id="color" v-model="user.id_color">
                                    <option v-for="c in colors" :value="c.id_color">{{ c.nom }}</option>
                                </select>
                            </div>
                            <!-- <div class="parametre__form--inputs_groupe">
                                <label for="mdp">Mot de Passe</label>
                                <input type="text" name="mdp" id="mdp" v-model="user.mdp">
                            </div> -->
                        </div>
                        <input class="parametre__form--bouton" type="submit" value="Modifier">
                    </form>
                    <p v-if="message">{{ message }}</p>
                </section>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.parametre{
    
    &__section{
        margin-bottom: $pc-m-xl2;
    }

    &__form{
        width: fit-content;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: $ph-m-lg;

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

                select{
                    padding: $ph-m-sm;
                    border: none;
                    border-radius: $ph-r-md;
                    background: $c-main;
                    font-family: $font, monospace;
                }
            }
        }

        &--bouton{
            @include my_button;
            margin: auto;

            &:focus{
                background: darken($c-main, 10%);
            }
        }
    }

    @include medium{

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
</style>

<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const colors = ref()
const user = ref()
const message = ref()

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
            message.value = "Les modifications ont bien été enregistrées."
            user.value.mdp = ''
        } else {
            message.value = "Erreur lors de la modification."
        }
        
    } catch (error) {
        console.error("Erreur lors de la modification :", error.message)
        message.value = "Erreur lors de la modification."
    }
}

// modification des données du bureau du User
const modifBureau = async () => {
    try {
        const response = await API.put(`/user/modif_bureau`, user.value);        

        if(response.data.message == "bien modif"){
            store.setMainColor(user.value.id_color)
            message.value = "Les modifications ont bien été enregistrées."
            user.value.mdp = ''
        } else {
            message.value = "Erreur lors de la modification."
        }
        
    } catch (error) {
        console.error("Erreur lors de la modification :", error.message)
        message.value = "Erreur lors de la modification."
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

// renvoie l'user sur l'index s'il n'est pas connecté
// definePageMeta({
//     middleware: [
//         function (to, from) {},
//         'auth',
//     ],
// });
</script>