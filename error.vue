<template>
    <div>
        <NuxtLayout name="intro" class="error">
            <div class="error__glitch-erreur"></div>
            <div class="error__glitch-404"></div>
            <div class="error__glitch-500"></div>
            <div class="error__glitch-page"></div>

            <div class="error__content">
                <h1 class="glitch">
                    <span class="line" data-error="ERREUR">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
                    <span class="line">ERROR {{ error.statusCode }}</span>
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
    position: relative;
    background: darken($c-red, 53%) radial-gradient(rgba($c-red, 10%) 5%, transparent) !important;

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
                        color: $c-pink;
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

    &__glitch-erreur{
        position: absolute;
        top: 5%;
        left: 5%;

        &::after {
            content: "Error";
            @include h2;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            color: $c-white;
            animation: noise .3s linear infinite;
        }

        @include medium{
            top: 30%;
            left: 15%;
        }
    }

    &__glitch-404{
        position: absolute;
        bottom: 10%;
        right: 30%;
        @include h1;

        &::after {
            content: "404";
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            color: $c-white;
            animation: noise .3s .1s linear infinite;
        }

        @include medium{
            bottom: 30%;
            right: 20%;
        }
    }

    &__glitch-500{
        position: absolute;
        bottom: 60%;
        left: 15%;
        @include h1;

        &::after {
            content: "500";
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            color: $c-white;
            animation: noise .3s .2s linear infinite;
        }

        @include medium{
            bottom: 20%;
            left: 5%;
        }
    }

    &__glitch-page{
        position: absolute;
        top: 25%;
        right: 30%;
        @include p;

        &::after {
            content: "Page not found";
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            color: $c-white;
            animation: noise .3s .2s linear infinite;
        }

        @include medium{
            top: 25%;
            right: 30%;
        }
    }

}

@keyframes noise {
  0%, 20%, 40%, 60%, 70%, 90% {opacity: 0;}
  10% {opacity: .1; transform: skewX(90deg);}
  50% {opacity: .5; left: -6px; transform: skewX(0deg);}
  80% {opacity: .3; ;}
  100% {opacity: .6; left: 2px;}
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
