<template>
    <body>
        <h1>How to meet aliens ?</h1>
        <h2>Bureau de &lt;{{user.pseudo}}&gt;</h2>        

        <RouterLink to="/old_missions">Acciennes Missions</RouterLink>

        <button @click="deconnexion()">Fermer la session</button>
    </body>
</template>

<style lang="scss">

</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const user = ref([])

// récupération de toutes les tables nécéessaires à l'affichage des montres et des filtres
const getUser = async () => {
    const response = await API.get(`/user/${store.token}`)
    user.value = response.data
}

// enregistrement de la montre modifiée dans la base de données
const deconnexion = async () => {
    store.clearToken() // Enregistrer le token dans le store Pinia
    router.push('/login')
}

// chargement de la base de données
onMounted(async() => {
    // Attendre que le token soit disponible
    await store.token

    if (store.token) {
        await getUser()
    }
})
</script>