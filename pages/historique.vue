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
                <myButton type="t_button" @click="rapports(0)">Missions</myButton>
                <myButton type="t_button" @click="rapports(1)">Rapports</myButton>
                <myButton type="t_button" @click="rapports(2)">Fins</myButton>
            </div>

            <h3>{{ titre }}</h3>

            <ul v-if="listeAffiche == 'missions'" class="historique__liste">
                <li v-for="m in missions" :key="m.date" class="historique__liste--item">
                   <span class="historique__liste--item_date">{{ m.date }} :</span> {{ getMissionString(m) }}
                </li>
            </ul>

            <ul v-else-if="listeAffiche == 'rapports'" class="historique__liste">
                <li v-for="j in tous_les_jours" class="historique__liste--item">
                    <span v-if="isJourDebloque(j)" class="historique__liste--item_nom">{{ j }}</span>
                    <span v-else class="historique__liste--item_none">Pas encore débloqué</span>
                </li>
            </ul>

            <ul v-else-if="listeAffiche == 'fins'" class="historique__liste">
                <li v-for="f in toutes_les_fins" class="historique__liste--item">
                    <span v-if="isFinDebloque(f)" class="historique__liste--item_nom">{{ f }}</span>
                    <span v-else class="historique__liste--item_none">Pas encore débloquée</span>
                </li>
            </ul>


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

    &__liste{

        &--item{
            margin: 1rem 0;

            &_date{
                color: $c-white;
            }

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
    
    @include medium{
        
        &__buttons{
            gap: $pc-m-md;
            margin-bottom: $pc-m-lg;
        }
    }
}
</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const tous_les_jours = ref([])
const toutes_les_fins = ref([])

const debloque = ref([])
const missions = ref([])

const listeAffiche = ref("missions")
const titre = ref("Missions passées")

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
        debloque.value = response.data.rapports_debloques
    } catch (error) {
        console.error("Erreur lors de la récupération de l'historique de l'utilisateur :", error.message)
    }
}

// change le titre en fonction de la liste a afficher
const rapports = async(r) => {
    if (r == 0){
        titre.value = "Missions passées"
        listeAffiche.value = "missions"
    }
    else if (r == 1){
        titre.value = "Rapports débloqués"
        listeAffiche.value = "rapports"
    } else if (r == 2) {
        titre.value = "Fins débloquées"
        listeAffiche.value = "fins"
    }
}

// met en forme l'historique des missions
const getMissionString = (m) => {
  const date = m.date;
  const parties = m.partie.map((jour) => jour.nom).join(' > ');
  return `${parties}`;
};

// vérifie si le jour est débloqué par l'user
const isJourDebloque = (nom) => {
  return debloque.value.some((jour) => jour.nom == nom);
};

// vérifie si la fin est débloquée par l'user
const isFinDebloque = (nom) => {
  return debloque.value.some((jour) => jour.nom == nom && jour.fin == 1);
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