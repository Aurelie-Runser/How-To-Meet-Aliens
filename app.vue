<template>
    <div class="overlay">
        <NuxtPage/>
    </div>
</template>

<style lang="scss">
.overlay{
    width: 100vw;
    height: 100vh;
    padding: 5% 5px;
    background: $c-bg url("/fond.png");
    background-position: center;
    background-size: cover;
    
    @include medium{
        padding: 2% 5%;
    }
}
</style>

<script setup>
const store = useGlobalStore()

onMounted(() => {
    // fonction pour vérifier si l'utilisateur était connecté à sa dernière visite
    const token = localStorage.getItem("Token de Connexion")
    store.setToken(JSON.parse(token))
})
</script>