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

            <section class="first_section">
                <h2 class="global-titre_texte index__texte-title">Situation actuelle :</h2>
                <p class="index__texte-info">l'astronaute Spike Spiegel vient d'arriver sur la planète VMK_0324. Il est le seul survivant de son équipage.</p>
            </section>
            
            <section class="desktop__section">
                <h2 class="global-titre_texte index__texte-title">Objectifs de la mission :</h2>
                <ul class="index__texte-info">
                    <li>récupérer des ressources pour survivre.</li>
                    <li>rencontrer et établir de bons rapport avec l'espèces intelligente local, les Bourpis.</li>
                    <li>entretenir le vaisseau pour redécoller dans 10 jours.</li>
                </ul>
            </section>
    
            <myButton type="t_button" size="big" link="#">Commencer la mission</myButton>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.desktop{

    &__section{
        margin: $ph-m-lg 0;
    }

    @include medium{

        &__section{
            margin: $pc-m-lg auto;
        }
    }
}
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