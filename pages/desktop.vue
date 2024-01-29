<template>
    <div class="global-ecran">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Bureau de &lt;{{user.pseudo}}&gt;</h2>
            </template>
    
            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/old_missions">Anciennes Missions</myButton>
                    <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>
    
            <myButton type="t_button" size="big" link="#">Commencer la mission</myButton>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit ipsum ipsam omnis soluta placeat aliquam dicta provident voluptates ducimus recusandae voluptate nobis porro qui, perferendis deserunt voluptas. Et, architecto repellendus.</p>

            <p>FIN</p>
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
// definePageMeta({
//     middleware: [
//         function (to, from) {},
//         'auth',
//     ],
// });
</script>