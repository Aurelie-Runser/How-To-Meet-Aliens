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
                    <myButton type="t_button" @click="store.clearToken()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>
    
            <ul>
                <li v-for="j in historique.jours_debloques">{{ j.nom }}</li>
            </ul>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">

</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const historique = ref([])

// récupération de toutes les fins débloqué par l'user
const getHistorique = async () => {
    const response = await API.get(`/user/${store.token}/old_missions`)
    historique.value = response.data
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
definePageMeta({
  middleware: [
    function (to, from) {
    },
    'auth',
  ],
});
</script>