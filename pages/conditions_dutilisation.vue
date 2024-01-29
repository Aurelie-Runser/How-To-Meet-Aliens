<template>
    <div class="global-ecran">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Condition d'Utilisation</h2>
            </template>
    
            <template #aside>              
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/desktop">Retour Bureau</myButton>
                    <myButton type="t_button" link="/old_missions">Anciennes Missions</myButton>
                    <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
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