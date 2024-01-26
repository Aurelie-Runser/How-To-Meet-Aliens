<template>
    <div class="global-ecran">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Bureau de &lt;{{user.pseudo}}&gt;</h2>
            </template>
    
            <template #aside>
                <myButton type="t_button" link="old_missions">Anciennes Missions</myButton>
                <br/>
                <br/>
                <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
            </template>
    
            <myButton type="t_button" size="big" link="#">Commencer la mission</myButton>
        </NuxtLayout>
    </div>
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
        function (to, from) {},
        'auth',
    ],
});
</script>