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
    const pseudo = localStorage.getItem("Pseudo")
    const mainColor = localStorage.getItem("Theme")
    const raportsDebloques = localStorage.getItem('Rapports Débloqués')
    store.setUser(JSON.parse(token), pseudo, mainColor, raportsDebloques)
})
</script>