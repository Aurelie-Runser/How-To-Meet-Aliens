<template>
    <div class="parametre">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
                <h2>Paramètres</h2>
            </template>
    
            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/desktop">Bureau</myButton>
                    <myButton type="t_button" link="/historique">Historique</myButton>
                    <myButton type="t_button" @click="deconnexion()">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <p>apzeorfitgjhkedzspdoejhfrgjefoeipjhfrjg</p>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">

</style>

<script setup>

</script>