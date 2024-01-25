<template>
    <body>
        <h1>How to meet aliens ?</h1>

        <p>{{ user }}</p>
    </body>
</template>

<style lang="scss">

</style>
  
<script setup>
import {API} from '@/utils/axios'

// const store = useGlobalStore()

const user = ref([])

// récupération de toutes les tables nécéessaires à l'affichage des montres et des filtres
const getUser = async () => {
    const response = await API.get(`/jours`)
    user.value = response.data
}

// chargement de la base de données
onMounted(async () => {
  await getUser()
})
</script>