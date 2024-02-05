<template>
    <div class="mission" :class="mainColor">
        <NuxtLayout :color="jour_actuel.decision">
            <template #header>
                <h1 class="mission__h1">How to meet aliens ?</h1>
            </template>
    
            <template #aside>
                <div class="mission__aside--stiuation">
                    <h2 class="global-titre_texte">Situation : </h2>
                    <p class="mission__texte--aside">{{jour_actuel.situation}}</p>
                </div>

                <div class="mission__aside--objectifs">
                    <h2 class="global-titre_texte">Objectifs : </h2>
                    <ul class="mission__texte--aside">
                        <li v-for="ob in jour_actuel.objectifs">{{ob}}</li>
                    </ul>
                </div>

                <div class="mission__aside--etat">
                    <h2 class="global-titre_texte">état de Spike : </h2>

                    <div class="etat">
                        <div class="niveau">
                            <div class="niveau__bloc"><div class="niveau__variable" :style="{ width: level(jour_actuel.faimsoif) }"></div></div>
                            <p class="mission__texte--aside niveau__nom">nourriture</p>
                        </div>

                        <div class="niveau">
                            <div class="niveau__bloc"><div class="niveau__variable" :style="{ width: level(jour_actuel.fatigue) }"></div></div>
                            <p class="mission__texte--aside niveau__nom">fatigue</p>
                        </div>

                        <div class="niveau">
                            <div class="niveau__bloc"><div class="niveau__variable" :style="{ width: level(jour_actuel.mentale) }"></div></div>
                            <p class="mission__texte--aside niveau__nom">santé mentale</p>
                        </div>

                        <div class="tete"><tete3d/></div>
                    </div>
                </div>
            </template>

            <div class="mission__jour" v-for="(etape, index) in jours_joues" :key=index+1>

                <h2 class="mission__jour--titre global-titre_texte">Jour {{ index+1 }} :</h2>
                <p class="mission__texte">{{ etape.texte }}</p>

                <div class="mission__jour--buttons" v-if="index + 1 == jours_joues.length">
                    <myButton type="t_button" :color="jour_actuel.decision" v-for="choix in etape.jours_suivants"
                        @click="(jour = choix.id_jour) && getJour()">

                        {{ choix.texte_bouton }}
                    </myButton>

                    <myButton type="t_button" :color="jour_actuel.decision" v-if="etape.fin" @click="getPartie()">Retour Bureau</myButton>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
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

    &__texte{
        color: $c-white;

        &--aside{
            @include recap_texte;
        }
    }

    &__aside{
        &--etat{

            .etat{
                display: flex;
                flex-direction: column;
                gap: $pc-m-sm;
    
                .niveau{                
                    display: flex;
                    align-items: center;
                    gap: $ph-m-sm;
        
                    &__bloc{
                        height: 20px;
                        width: 200px;
                        border: 2px solid $c-main;
                    }
        
                    &__variable{
                        height: 100%;
                        background: $c-main;
                    }

                    &__nom{
                        text-transform: uppercase;
                    }
                }
        
                .tete{
                    width: 66%;
                    aspect-ratio: 1/1;
                    border: 2px solid $c-main;
                }
            }
        }
    }

    &__jour{
        margin-bottom: $ph-m-xl;

        &--buttons{
            margin-top: $ph-m-xl;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            gap: $ph-m-sm;
        }
    }
    
    @include medium{

        &__aside{

            &--etat{

                .etat{

                    .tete{
                        width: 100%;
                    }
                }
            }
        }
        
        &__jour{
            margin-bottom: $pc-m-xl;

            &--buttons{
                margin-top: $pc-m-xl;
                gap: $pc-m-sm;
            }
        }
    }

    // changement de couleur si les choix sont bons
    &.-good{
        h1,
        h2{
            color: $c-blue;
        }

        .mission__titre{
            &--num,
            &--date{
                color: $c-blue;
            }
        }

        .niveau{                
            &__bloc{
                border-color: $c-blue;
            }
            &__variable{
                background-color: $c-blue;
            }
        }
        .tete{
            border-color: $c-blue;
        }
    }

    // changement de couleur si les choix sont mauvais
    &.-bad{
        h1,
        h2{
            color: $c-red;
        }

        .mission__titre{
            &--num,
            &--date{
                color: $c-red;
            }
        }

        .niveau{                
            &__bloc{
                border-color: $c-red;
            }
            &__variable{
                background-color: $c-red;
            }
        }
        .tete{
            border-color: $c-red;
        }
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const jour_actuel = ref([])
const jours_joues = ref([])
const jours_joues_id = ref([])

let jour = 1

const currentDate = new Date();


// récupération de l'ensemble des jours
const getJour = async () => {
    const response = await API.get(`/jour/${jour}`)
    response.data.objectifs = response.data.objectifs.split(',').map(objectif => objectif.trim());
    jour_actuel.value = response.data

    jours_joues.value.push(response.data)
    jours_joues_id.value.push(response.data.id_jour)
}

// envoie la liste des jours pour les ajouter à l'historique
const getPartie = async () => {
    const mission = ref({})
    mission.value.id_user = store.token
    mission.value.jours = jours_joues_id.value
    mission.value.partie = jours_joues_id.value.join(', ')
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    mission.value.date = formattedDate

    try{
        await API.post(`/partie`, mission.value )
        
        // récupère la liste des rapports débloqué mise à jour
        const response = await API.get(`/user/${store.token}`)
        store.setUser(null, null, response.data.rapports_debloques.length)

        router.push("/desktop")
    } catch (error) {
        console.error("Erreur lors de l'ajout de la partie à l'historique :", error.message)
    }
}

// Fonction pour calculer la largeur en fonction de la valeur de faimsoif
const level = (niv) => {
    const width = niv * 10 + '%';
    return width;
};

const mainColor = computed(() => ({
    " -good": jour_actuel.value.decision === "good",
    " -bad": jour_actuel.value.decision === "bad",
}));

// chargement de la base de données
onMounted(async() => {
    await getJour()

    // demande confirmation avant de quitter la page (avertie de la perte de la partie en cours)
    window.onbeforeunload = function (){
        return "";
    };
})

// renvoie l'user sur l'index s'il n'est pas connecté
// definePageMeta({
//     middleware: [
//         function (to, from) {},
//         'auth',
//     ],
// });

</script>