<template>
    <div class="mission">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
            </template>
    
            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/old_missions">Anciennes Missions</myButton>
                    <myButton type="t_button">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <div class="mission__section" v-for="(etape, index) in jours" :key=index+1>

                <p class="mission__section--titre global-titre_texte">Jour {{ index+1 }} :</p>
                <p class="mission__section--texte">{{ etape.texte }}</p>

                <div class="mission__section--buttons" v-if="index + 1 == jours.length">
                    <myButton type="t_button" v-for="choix in etape.jours_suivants"
                        @click="(jour = choix.id_jour) && getJour()">

                        {{ choix.id_jour }}
                        Choix {{ choix.texte_bouton }}
                    </myButton>

                    <myButton type="t_button" v-if="etape.fin">Retour Bureau</myButton>
                </div>
            </div>
    
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.mission{

    &__section{
        margin-bottom: $pc-m-xl;

        &--texte{
            color: $c-white;
        }

        &--buttons{
            margin-top: $ph-m-xl;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            gap: $ph-m-sm;
        }
    }
    
    @include medium{
        
        &__section{

            &--buttons{
                margin-top: $pc-m-xl;
                gap: $pc-m-sm;
            }
        }
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'

const jours = ref([])
let jour = 1

// récupération de l'ensemble des jours
const getJour = async () => {
    const response = await API.get(`/jour/${jour}`)
    jours.value.push(response.data)
}

// chargement de la base de données
onMounted(async() => {
    await getJour()
})

// renvoie l'user sur l'index s'il n'est pas connecté
// definePageMeta({
//     middleware: [
//         function (to, from) {},
//         'auth',
//     ],
// });
</script>