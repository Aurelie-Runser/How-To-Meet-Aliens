<template>
    <body class="desktop">
        <h1>How to meet aliens ?</h1>
        <h2>Bureau de &lt;{{user.pseudo}}&gt;</h2>        

        <myButton type="t_button" size="big" link="old_missions">Aciennes Missions</myButton>
        <br/>
        <br/>
        <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
    </body>
</template>

<style lang="scss">
</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const user = ref([])

// récupération du pseudo de l'utilisateur connecté
const getUser = async () => {
    const response = await API.get(`/user/${store.token}`)
    user.value = response.data
}

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
        await getUser()
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