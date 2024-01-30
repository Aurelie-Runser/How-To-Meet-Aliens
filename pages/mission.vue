<template>
    <div class="mission">
        <NuxtLayout>
            <template #header>
                <h1>How to meet aliens ?</h1>
            </template>
    
            <template #aside>
                <div class="global-aside__boutons">
                    <myButton type="t_button" link="/old_missions">Anciennes Missions</myButton>
                    <myButton type="t_button">Fermer la session</myButton>
                </div>
                <div class="global-aside__links">
                    <myButton type="t_link" size="small" link="/responsable_de_mission">Informations_sur_le_responsable_de_mission</myButton>
                    <myButton type="t_link" size="small" link="/conditions_dutilisation">Conditions_d'utilisation_de_la_machine</myButton>
                </div>
            </template>

            <section class="first_section">
                <h2 class="global-titre_texte">Jour 1 :</h2>
                <p class="index__texte-info">l'astronaute Spike Spiegel vient d'arriver sur la planète VMK_0324. Il est le seul survivant de son équipage.</p>
            </section>
    
            <div class="mission__button">
                <myButton type="t_button" link="#">Choix 1</myButton>
                <myButton type="t_button" link="#">Choix 2</myButton>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>

</script>