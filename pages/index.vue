<template>
    <div class="in">
        <div class="in_overlay">
            <div class="in_overlay--pixels"></div>
        </div>

        <NuxtLayout name="intro" class="index">
            <h1 class="index__h1"><titleAnimation debut="2" texte="How to meet aliens ?"/></h1>

            <div class="index__textes">
                <section class="index__section">
                    <h2 class="global-titre_texte index__texte-title">
                        <texteAnimation debut="5" texte="Situation actuelle :"/>
                    </h2>
                    <p class="index__texte-info">
                        <texteAnimation debut="5.5" texte="l'astronaute Spike Spiegel vient d'arriver sur la planète VMK_0324. Il est le seul survivant de son équipage."/>
                    </p>

                </section>
                
                <section class="index__section">
                    <h2 class="global-titre_texte">
                        <texteAnimation debut="5" texte="Objectifs de la mission :"/>
                    </h2>
                    <ul class="index__texte-info">
                        <li v-if="item_1">
                            <texteAnimation debut="0" texte="trouver et passer un accord de paix avec l'espèce intelligente locale, les Bourpis."/>
                        </li>
                        <li v-if="item_2">
                            <texteAnimation debut="0" texte="faire revenir l'astronaute Spike Spiegel vivant sur Terre."/>
                        </li>
                    </ul>
                </section>

                <section class="index__section">
                    <h2 class="global-titre_texte">
                        <texteAnimation debut="5" texte="Vos objectifs :"/>
                    </h2>
                    <ul class="index__texte-info">
                        <li v-if="item_3">
                            <texteAnimation debut="0" texte="bien conseiller l'astronaute Spike Spiegel afin qu'il établisse de bons rapports avec les Bourpis."/>
                        </li>
                        <li v-if="item_4">
                            <texteAnimation debut="0" :texte="`bien conseiller l'astronaute Spike Spiegel afin qu'il revienne vivant sur Terre. Son départ de VMK_0324 est programmé dans 7 jours : ${ mission_date }.`"/>
                        </li>
                    </ul>
                </section>
            </div>

            <div v-if="bouton" class="index__button">
                <myButton link="/login?fromIndex=true" type="t_button" size="big">Accepter la mission</myButton>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.index{

    &__h1{
        margin-bottom: $ph-m-xl2;
    }

    &__textes{
        width: auto;
        max-width: 1000px;
        margin: auto;
    }

    &__section{
        margin: $ph-m-lg 0;
    }

    &__texte-title{
        margin-bottom: $ph-m-sm;
        text-align: left;
    }

    &__texte-info{
        margin-top: 0;
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

.in{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    
    &_overlay{
        background-color: black;
        animation: animEcran 3s linear;

        &--pixels{
            position: absolute;
            background: $c-black radial-gradient(rgba($c-main, 10%) 5%, transparent);
            animation: animPixels 3s linear;

        }
    }
}

@keyframes animEcran{
    0%{
        width: 100%;
        height: 100%;
    }
    99%{
        width: 100%;
        height: 100%;
    }
    100%{
        width: 0;
        height: 0;
    }
}

@keyframes animPixels{
    0%{
        top: 50%;
        left: 50%;
        width: 3px;
        height: 3px;
        background: $c-main;
    }

    40%{
        top: 50%;
        left: 50%;
        width: 3px;
        height: 3px;
        background: $c-main;
    }

    50%{
        top: 50%;
        left: 0;
        width: 100%;
        height: 3px;
    }

    70%{
        top: 50%;
        left: 0;
        width: 100%;
        height: 3px;
    }

    90%{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $c-black radial-gradient(rgba($c-main, 10%) 5%, transparent);
    }

    100%{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>

<script setup>
const current_date = new Date();
const future_date = new Date(current_date.getTime() + 7 * 24 * 60 * 60 * 1000);

const mission_date = `${future_date.getFullYear()}-${(future_date.getMonth() + 1).toString().padStart(2, '0')}-${future_date.getDate().toString().padStart(2, '0')}`;

const item_1 = ref(false);
const item_2 = ref(false);
const item_3 = ref(false);
const item_4 = ref(false);
const bouton = ref(false);
const fromIndex = true

onMounted(() => {
    setTimeout(() => {
        item_1.value = true;
        item_3.value = true;
    }, 5500);

    setTimeout(() => {
        item_2.value = true;
    }, 7000);

    setTimeout(() => {
        item_4.value = true;
    }, 7000);

    setTimeout(() => {
        bouton.value = true;
    }, 10000);
});

useSeoMeta({
    title: "How To Meet Aliens ?",
    description: "Jeu narratif où vous conseillez un astronaute pour avoir une bonne entente avec des extraterrestres et définir l'avenir de l'humanité.",
    ogTitle: "How To Meet Aliens ?",
    ogDescription: "Jeu narratif où vous conseillez un astronaute pour avoir une bonne entente avec des extraterrestres et définir l'avenir de l'humanité.",
    ogImage: "/how_to_meet_aliens_logo.png",
})
</script>