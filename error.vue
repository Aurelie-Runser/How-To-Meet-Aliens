<template>
    <div>
        <NuxtLayout name="intro" class="error">

            <div class="error__content">
                <h1 class="glitch">
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                    <span class="line">ERREUR {{ error.statusCode }}</span>
                </h1>
                <p>{{ error.statusMessage }}</p>
    
                <div class="error__content--button">
                    <myButton type="t_button" size="big" @click="retourPage" color="main_color-2">Retour</myButton>
                    <myButton type="t_button" size="big" link="/" color="main_color-2">Accueil</myButton>
                </div>
            </div>

        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.error{
    background: darken($c-red, 45%) radial-gradient(rgba($c-red, 10%) 5%, transparent) !important;

    &__content{
        position: relative;
        width: fit-content;
        height: 85vh;
        margin: auto;
        
        p{
            width: fit-content;
            margin: $pc-m-md 0;
            font-size: $ph-f-md;
            color: $c-red;
            
            @include medium{
                font-size: $pc-f-md;
            }
        }

        &--button{
            width: 100%;
            height: fit-content;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            gap: $pc-m-md;
        }
    
        .glitch {
            margin: auto;
            width: fit-content;
            position: relative;
            color: $c-red;
        }
    
        .line {
            display: block;
            &:not(:first-child) {
                position: absolute;
                top: 0;
                left: 0;
            }
    
            @for $i from 1 through 10 {
                &:nth-child(#{$i}) {
                animation: clip 3000ms $i * -300ms linear infinite,
                    glitch#{$i} 500ms random(1000) * -1ms linear infinite;
    
                @keyframes glitch#{$i} {
                    0% {
                        transform: translateX(0);
                    }
                    80% {
                        transform: translateX(0);
                        color: $c-red;
                    }
                    85% {
                        transform: translateX(random(10) - 5px);
                        color: $c-white;
                    }
                    90% {
                        transform: translateX(random(10) - 5px);
                        color: $c-main;
                    }
                    95% {
                        transform: translateX(random(10) - 5px);
                        color: $c-red;
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                }
            }
        }
    
        @keyframes clip {
            0% {
                clip-path: polygon(0 100%, 100% 100%, 100% 120%, 0 120%);
            }
    
            100% {
                clip-path: polygon(0 -20%, 100% -20%, 100% 0%, 0 0);
            }
        }
    }
}

</style>

<script setup>
const props = defineProps({
  error: Object,
});

const retourPage = () => {
  history.back();
};
</script>
