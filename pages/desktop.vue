<template>
    <div>
        <NuxtLayout class="desktop" :class="`-main_color-${store.mainColor}`">
            <template #header>
                <h1 class="desktop__h1" v-if="titreBureau"><titleAnimation debut="0" :texte="titreBureau"/></h1>
            </template>
    
            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/historique">Historique</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/parametres">Paramètres</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <section>
                <h2 class="global-titre_texte">Situation actuelle :</h2>
                <p class="index__texte-info">l'astronaute Spike Spiegel vient d'arriver sur la planète VMK_0324. Il est le seul survivant de son équipage.</p>
            </section>
            
            <section class="desktop__section">
                <h2 class="global-titre_texte">Objectifs de la mission :</h2>
                <ul class="index__texte-info">
                    <li>récupérer des ressources pour survivre.</li>
                    <li>rencontrer et établir de bons rapport avec l'espèces intelligente local, les Bourpis.</li>
                    <li>entretenir le vaisseau pour redécoller dans 10 jours : {{ mission_date }}.</li>
                </ul>
            </section>
    
            <div class="desktop__button">
                <myButton type="t_button" :color="`main_color-${store.mainColor}`" size="big" link="/mission">Commencer la mission</myButton>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.desktop{

    &__h1{
        word-wrap: break-word;
        text-transform: none;
    }

    &__section{
        margin: $ph-m-lg 0;
    }

    &__texte-title{
        margin-bottom: $ph-m-sm;
        text-align: left;
    }

    &__button{
        width: fit-content;
        margin: auto;
    }

    @include medium{

        &__section{
            margin: $pc-m-lg auto;
        }

        &__texte-title{
            margin-bottom: $pc-m-sm;
        }
    }
}
</style>
  
<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const user = ref([])
const titreBureau = ref("")

const current_date = new Date();
const future_date = new Date(current_date.getTime() + 7 * 24 * 60 * 60 * 1000);

const mission_date = `${future_date.getFullYear()}-${(future_date.getMonth() + 1).toString().padStart(2, '0')}-${future_date.getDate().toString().padStart(2, '0')}`;

// récupération du pseudo de l'utilisateur connecté
const getUser = async () => {
    const response = await API.get(`/user/${store.token}`)
    user.value = response.data
    titreBureau.value = user.value.titre.replace("[pseudo]", store.pseudo);
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

useSeoMeta({
    title: "Desktop - How To Meet Aliens ?",
    description: "Bureau du joueur du jeu narratif How To Meet Aliens ?",
    ogTitle: "How To Meet Aliens ? Page du Desktop",
    ogDescription: "Bureau du joueur du jeu narratif How To Meet Aliens ?",
    ogImage: "/how_to_meet_aliens_logo.png",
})

// renvoie l'user sur l'index s'il n'est pas connecté
definePageMeta({
    middleware: [
        function (to, from) {},
        'auth',
    ],
});
</script>