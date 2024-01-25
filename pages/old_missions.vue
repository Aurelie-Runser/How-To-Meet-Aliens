<template>
    <body>
        <h1>How to meet aliens ?</h1>
        <h2>Historique de mission</h2>

        <ul>
            <li v-for="j in historique.jours_debloques">{{ j.nom }}</li>
        </ul>
        
        <RouterLink to="/desktop">Retour Bureau</RouterLink>

    </body>
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
</script>