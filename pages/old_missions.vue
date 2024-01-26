<template>
    <div class="global-ecran">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Historique de mission</h2>
            </template>
    
            <template #aside>
                <myButton type="t_button" link="/desktop">Retour Bureau</myButton>
                <br/>
                <br/>
                <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
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

// récupération de toutes les tables nécéessaires à l'affichage des montres et des filtres
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