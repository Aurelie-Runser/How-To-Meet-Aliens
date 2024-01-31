<template>
    <div >
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Responsable de Mission</h2>
            </template>
    
            <template #aside>              
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/desktop">Retour Bureau</myButton>
                    <myButton type="t_button" link="/historique">Historique</myButton>
                    <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>
    
            <p>HELLO WORLD</p>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">

</style>
  
<script setup>
const store = useGlobalStore()

const router = useRouter()

// suppression du token pour déconnecter l'utilisateur
const deconnexion = async () => {
    store.clearToken()
    router.push('/login')
}
</script>