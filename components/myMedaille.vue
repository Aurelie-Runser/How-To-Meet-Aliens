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
        font-weight: $fw-bold;
        color: $c-white;
        text-align: center;
    }    
    
    @include medium{
        width: 150px;
    }
}
</style>

<script setup>
const props = defineProps({
    id: String,
    nom: String
});
</script>