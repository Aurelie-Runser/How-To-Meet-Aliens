<template>
    <div >
        <NuxtLayout :class="`-main_color-${store.mainColor}`">
            <template #header>
                <h1>Responsable de Mission</h1>
            </template>
    
            <template #aside>              
                <div class="global-aside__boutons">
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/desktop">Bureau</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/historique">Historique</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/parametres">Paramètres</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
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