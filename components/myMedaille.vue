<template>
    <div class="myMedaille">
        <img :src="`/medailles/medaille_${id}.svg`" :alt="`icon de la médaille numéro ${id}`">
        <p class="myMedaille__nom">{{nom}}</p>
    </div>
</template>

<style lang="scss">
.myMedaille{
    width: 100px;
    height: auto;

    &__nom{
        font-size: $ph-f-md;
        font-weight: $fw-bold;
        color: $c-white;
        text-align: center;
    }    
    
    @include medium{
        width: 200px;

        &__nom{
            font-size: $pc-f-md;
        }
    }
}
</style>

<script setup>
const props = defineProps({
    id: String,
    nom: String
});
</script>