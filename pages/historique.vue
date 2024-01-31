<template>
    <div class="historique">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Historique de mission</h2>
            </template>
    
            <template #aside>              
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/desktop">Retour Bureau</myButton>
                    <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <div class="historique__buttons">
                <myButton type="t_button" @click="listeAffiche = 'missions'">Missions</myButton>
                <myButton type="t_button" @click="listeAffiche = 'rapports'">Rapports</myButton>
                <myButton type="t_button" @click="listeAffiche = 'fins'">Fins</myButton>
            </div>

            
            <div v-if="listeAffiche == 'missions'">
                <h3>Missions passées</h3>

                <ul class="historique__liste liste__missions">
                    <li v-if="missions.length == 0" class="liste__missions--green">Vous n'avez réalisé aucune mission.</li>
                    <li v-else v-for="m in missions" :key="m.date" class="historique__liste--item">
                       {{ m.date }} :
                       <ul class="liste__missions--nom__jour">
                            <li v-for="jour in m.partie">{{jour.nom}}</li>
                       </ul>
                       <MyButton type="t_link" :link="`/mission/${m.id_mission}`" size="small">Relire_les_rapports</MyButton>
                    </li>
                </ul>
            </div>

            <div v-else-if="listeAffiche == 'rapports'">
                <h3>Rapports débloqués <span class="historique__titre--pourcent">{{ jours_debloques_pourcent }}%</span></h3>

                <ul class="historique__liste">
                    <li v-for="j in tous_les_jours" class="historique__liste--item">
                        <span v-if="isJourDebloque(j)" class="historique__liste--item_nom">{{ j }}</span>
                        <span v-else class="historique__liste--item_none">Pas encore débloqué</span>
                    </li>
                </ul>
            </div>

            <div v-else-if="listeAffiche == 'fins'">
                <h3>Fins débloquées <span class="historique__titre--pourcent">{{ fins_debloques_pourcent }}%</span></h3>

                <ul class="historique__liste">
                    <li v-for="f in toutes_les_fins" class="historique__liste--item">
                        <span v-if="isFinDebloque(f)" class="historique__liste--item_nom">{{ f }}</span>
                        <span v-else class="historique__liste--item_none">Pas encore débloquée</span>
                    </li>
                </ul>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.historique{

    &__buttons{
        display: flex;
        flex-wrap: wrap;
        gap: $ph-m-md;
        margin-bottom: $ph-m-lg;
    }

    &__titre{

        &--pourcent{
            font-size: $ph-f-lg;
            font-weight: $fw-regular;
            font-style: italic;
            color: $c-main;
        }
    }

    &__liste{

        &--item{
            margin: 1rem 0;

            &_none{
                font-weight: $fw-bold;
                font-style: italic;
                text-transform: uppercase;
            }
        }

              
        &:first-child{
            margin-top: 0;
        }

        &:last-child{
            margin-bottom: 0;
        }
    }

    .liste__missions{
        li{
            margin: 2rem 0;
            color: $c-white;
        }

        &--nom__jour{
            margin: 0;

            li{
                margin: 0.5rem;
                margin-left: 2rem;
                color: $c-main;

                &::before {
                    content: "> ";
                    font-weight: $fw-regular;
                    color: $c-white;
                }
            }
        }

        &--green{
            color: $c-main !important;
        }
        
        &:first-child{
            margin-top: 0;
        }

        &:last-child{
            margin-bottom: 0;
        }
    }
    
    @include medium{
        
        &__buttons{
            gap: $pc-m-md;
            margin-bottom: $pc-m-lg;
        }

        &__titre{

            &--pourcent{
                font-size: $pc-f-lg;
            }
        }
    }
}
</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

// tableau qui stoque les noms de tous les jours
const tous_les_jours = ref([])
// tableau qui stoque les noms de toutes les fins
const toutes_les_fins = ref([])

// liste des jours débloqués
const jours_debloques = ref([])
// nombre en pourcentage des jours débloqués
const jours_debloques_pourcent = ref()
// liste des fins débloqués
const fins_debloques = ref([])
// nombre en pourcentage des fins débloquées
const fins_debloques_pourcent = ref()
// liste des parties détaillées
const missions = ref([])

// variable qui permet d'afficher tel ou tel liste
const listeAffiche = ref("missions")

// récupération de la liste de tous les jours
const getJours = async () => {
    try{
        const response = await API.get(`/jours`)
        tous_les_jours.value = response.data.map(jour => jour.nom);
        toutes_les_fins.value = response.data
            .filter(jour => jour.fin == 1)
            .map(jour => jour.nom);
    } catch (error) {
        console.error("Erreur lors de la récupération de la liste des jours :", error.message)
    }
}

// récupération de l'historique de l'user
const getHistorique = async () => {
    try{
        const response = await API.get(`/user/${store.token}/historique`)
        missions.value = response.data.missions.reverse()

        jours_debloques.value = response.data.rapports_debloques
        jours_debloques_pourcent.value = Math.floor((jours_debloques.value.length / tous_les_jours.value.length)*100)

        fins_debloques.value = jours_debloques.value.filter(jour => jour.fin == 1)
        fins_debloques_pourcent.value = Math.floor((fins_debloques.value.length / toutes_les_fins.value.length)*100)
    } catch (error) {
        console.error("Erreur lors de la récupération de l'historique de l'utilisateur :", error.message)
    }
}

// vérifie si le jour est débloqué par l'user
const isJourDebloque = (nom) => {
    return jours_debloques.value.some((jour) => jour.nom == nom)
};

// vérifie si la fin est débloquée par l'user
const isFinDebloque = (nom) => {
    return fins_debloques.value.some((jour) => jour.nom == nom)
};

// suppression du token pour déconnecter l'user
const deconnexion = async () => {
    store.clearToken()
    router.push('/login')
}

// chargement de la base de données
onMounted(async() => {
    // Attendre que le token soit disponible
    await store.token
    await getJours()
    
    if (store.token) {
        await getHistorique()
    }
})

// renvoie l'user sur l'index s'il n'est pas connecté
// definePageMeta({
//   middleware: [
//     function (to, from) {
//     },
//     'auth',
//   ],
// });
</script>