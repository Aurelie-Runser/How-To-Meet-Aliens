<template>
    <div class="global-ecran">
        <NuxtLayout name="intro" class="index">
            <h1 class="index__h1">How to meet aliens ?</h1>

            <div class="index__textes">
                <section class="index__section">
                    <h2 class="index__texte-title">Situation actuelle :</h2>
                    <p class="index__texte-info">l'astronaute Spike Spiegel vient d'arriver sur la planète VMK_0324. Il est le seul survivant de son équipage.</p>
                </section>
                
                <section class="index__section">
                    <h2 class="index__texte-title">Objectifs de la mission :</h2>
                    <ul class="index__texte-info">
                        <li>récupérer des ressources pour survivre.</li>
                        <li>rencontrer et établir de bons rapport avec l'espèces intelligente local, les Bourpis.</li>
                        <li>entretenir le vaisseau pour redécoller dans 10 jours.</li>
                    </ul>
                </section>
                
                <section class="index__section">
                    <h2 class="index__texte-title">Vos objectifs :</h2>
                    <ul class="index__texte-info">
                        <li>bien conseiller l'astronaute Spike Spiegel afin qu'il établisse de bon rapport avec les Bourpis.</li>
                        <li>bien conseiller l'astronaute Spike Spiegel afin qu'il revienne vivant sur Terre. Son départ de XYZ est programmer dans 10 jours.</li>
                    </ul>
                </section>
            </div>

            <div class="index__button">
                <myButton link="/login" type="t_button" size="big">Se connecter</myButton>
            </div>
        </NuxtLayout >
    </div>
</template>

<style lang="scss">
.index{
    width: 100%;

    &__h1{
        @include h2;
        margin-bottom: $ph-m-xl2;
    }

    &__textes{
        width: fit-content;
        margin: auto;
    }

    &__section{
        margin: $ph-m-lg 0;
    }

    &__texte-title{
        @include titre_texte;
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
</style>