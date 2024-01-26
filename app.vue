<template>
    <div>
      <NuxtPage/>
    </div>
</template>

<script setup>
const store = useGlobalStore()

onMounted(() => {
    // fonction pour vérifier si l'utilisateur était connecté à sa dernière visite
    const token = localStorage.getItem("Token de Connexion")
    store.setToken(JSON.parse(token))
})
</script>