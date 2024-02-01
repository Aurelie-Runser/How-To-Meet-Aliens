<template>
    <div class="mission">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
            </template>
    
            <template #aside v-if="mission">
                <div class="mission__aside--stiuation">
                    <p class="global-titre_texte">Situation : </p>
                    <p class="mission__texte--aside">{{jour_last.situation}}</p>
                </div>

                <div class="mission__aside--objectifs">
                    <p class="global-titre_texte">Objectifs : </p>
                    <ul class="mission__texte--aside">
                        <li v-for="ob in jour_last.objectifs">{{ob}}</li>
                    </ul>
                </div>

                <div class="mission__aside--etat">
                    <p class="global-titre_texte">état de Spike : </p>

                    <div class="etat">
                        <div class="niveau">
                            <div class="niveau__bloc"><div class="niveau__variable" :style="{ width: level(jour_last.faimsoif) }"></div></div>
                            <p class="mission__texte--aside niveau__nom">nourriture</p>
                        </div>

                        <div class="niveau">
                            <div class="niveau__bloc"><div class="niveau__variable" :style="{ width: level(jour_last.fatigue) }"></div></div>
                            <p class="mission__texte--aside niveau__nom">fatigue</p>
                        </div>

                        <div class="niveau">
                            <div class="niveau__bloc"><div class="niveau__variable" :style="{ width: level(jour_last.mentale) }"></div></div>
                            <p class="mission__texte--aside niveau__nom">santé mentale</p>
                        </div>

                        <div class="tete"></div>
                    </div>
                </div>
            </template>

            <div v-if="mission">
                <h3>Mission n°<span class="mission__titre--num">{{ mission.id_mission }}</span> du <span class="mission__titre--date">{{ mission.date }}</span></h3>
    
                <div class="mission__jour" v-for="(etape, index) in mission.partie" :key=index+1>
                    <p class="mission__jour--titre global-titre_texte">Jour {{ index+1 }} :</p>
                    <p class="mission__texte">{{ etape.texte }}</p>
                </div>
    
                <div class="mission__jour--buttons">
                    <myButton type="t_button" link="/historique">Retour Historique</myButton>
                    <myButton type="t_button" link="/desktop">Retour Bureau</myButton>
                </div>
            </div>

        </NuxtLayout>
    </div>
</template>

<style lang="scss">
// le reste du style de la page est dans la vue pages/mission/index.vue
.mission{

    &__titre{

        &--num{
            color: $c-main;
            text-decoration: underline;
            font-style: italic;
            font-weight: $fw-regular;
        }

        &--date{
            font-weight: $fw-regular;
            color: $c-main;
        }
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const route = useRoute();
const mission = ref()
const jour_last = ref()

const currentDate = new Date();

// récupération de la mission
const getMission = async () => {
    const response = await API.get(`/mission/${route.params.id}`)
    mission.value = response.data
    mission.value.id_mission = mission.value.id_mission.toString().padStart(3, '0')
    jour_last.value = mission.value.partie[mission.value.partie.length-1]

    jour_last.value.objectifs = jour_last.value.objectifs.split(',').map(objectif => objectif.trim());
}

// Fonction pour calculer la largeur en fonction de la valeur de faimsoif
const level = (niv) => {
    const width = niv * 10 + '%';
    return width;
};

// chargement de la base de données
onMounted(async() => {
    await getMission()
})

// renvoie l'user sur l'index s'il n'est pas connecté
// definePageMeta({
//     middleware: [
//         function (to, from) {},
//         'auth',
//     ],
// });
</script>