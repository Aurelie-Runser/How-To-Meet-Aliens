<template>
    <div class="global-ecran">
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

            <div class="old__buttons">
                <myButton type="t_button" @click="rapports(0)">Missions</myButton>
                <myButton type="t_button" @click="rapports(1)">Jours</myButton>
                <myButton type="t_button" @click="rapports(2)">Fins</myButton>
            </div>

            <h3>{{ titre }}</h3>

            <ul v-if="missionsVisible">
                <li v-for="m in missions" :key="m.date">
                    {{ getMissionString(m) }}
                </li>
            </ul>
    
            <ul v-else>
                <li v-for="j in historique">{{ j.nom }}</li>
            </ul>

        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.old{

    &__buttons{
        display: flex;
        flex-wrap: wrap;
        gap: $ph-m-lg;
    }
    
    @include medium{
        
        &__buttons{
            gap: $pc-m-lg;
        }
    }
}
</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const debloque = ref([])
const missions = ref([])
const historique = ref([])

const missionsVisible = ref(true)
const titre = ref("Rapports débloquées")

// récupération de toutes les fins débloqué par l'user
const getHistorique = async () => {
    const response = await API.get(`/user/${store.token}/historique`)
    missions.value = response.data.missions
    debloque.value = response.data.rapports_debloques
    historique.value = debloque.value
}

const rapports = async(r) => {
    if (r == 0){
        historique.value = missions.value
        titre.value = "Missions passés"
        missionsVisible.value = true
    }
    else if (r == 1){
        // retourne tous les rapports
        historique.value = debloque.value
        titre.value = "Rapports débloquées"
        missionsVisible.value = false
    } else if (r == 2) {
        // retourne seulement les fins
        historique.value = debloque.value.filter(j => j.fin == 1)
        titre.value = "Fins débloquées"
        missionsVisible.value = false
    }
}

const getMissionString = (m) => {
  const date = m.date;
  const parties = m.partie.map((jour) => jour.nom).join(' > ');
  return `${date} : ${parties}`;
};

// suppression du token pour déconnecter l'utilisateur
const deconnexion = async () => {
    store.clearToken()
    router.push('/login')
}

// chargement de la base de données
onMounted(async() => {
    // Attendre que le token soit disponible
    await store.token

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