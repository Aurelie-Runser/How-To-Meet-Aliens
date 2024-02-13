<template>
    <div>
        <NuxtLayout class="apropos" :class="`-main_color-${store.mainColor}`">
            <template #header>
                <h1 class="apropos__h1">Responsable de Mission</h1>
            </template>
    
            <template #aside>              
                <div class="global-aside__boutons">
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/desktop">Bureau</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/historique">Historique</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" link="/parametres">Paramètres</myButton>
                    <myButton type="t_button" :color="`main_color-${store.mainColor}`" @click="deconnexion()">Fermer la session</myButton>
                </div>
            </template>
    
            <p>La responsable de la mission est <span class="apropos__avant">Aurélie Runser</span>. C'est elle qui a créé ce programme du début à la fin, de l'idée au design à la réalisation, en tant que projet de fin de 3ème année en BUT MMI à l'<myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" href="https://mmimontbeliard.com">IUT_de_Montbéliard</myButton>, en 3 semaines.</p>
            <p>Pour en savoir plus sur elle, ses compétences et autres projets, vous pouvez consulter <myButton type="t_link" :color="`main_color-${store.mainColor}`" href="https://portfolio.aurelierunser.fr">le_CV_d_Aurélie_Runser</myButton>.</p>
            <p>Le model 3D n'a pas été réalisé par <span class="apropos__avant">Aurélie Runser</span>. This work is based on "<myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" href="https://sketchfab.com/3d-models/cute-astronaut-11bba8ead8a74de58ed3d4a2ea83f50c">Cute_Astronaut</myButton>" by <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" href="https://sketchfab.com/farooq.smurf">farooq.smurf</myButton> licensed under <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" href="http://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</myButton></p>
            <p>Les fleures sur la médaille "Congé payé chez les Bourpis" ont été designées par <myButton type="t_link" size="small" :color="`main_color-${store.mainColor}`" href="https://www.figma.com/@prisciladuarte">Priscila Duarte</myButton>.</p>
            
            <div class="apropos__contact">
                <p>Pour rentrer en contact avec <span class="apropos__avant">Aurélie Runser</span>, vous pouvez utilisez :</p>
                <ul>
                    <li><myButton type="t_link" :color="`main_color-${store.mainColor}`" href="https://portfolio.aurelierunser.fr">Portfolio</myButton></li>
                    <li><myButton type="t_link" :color="`main_color-${store.mainColor}`" href="https://www.linkedin.com/in/aur%C3%A9lie-runser">linkedin</myButton></li>
                    <li><myButton type="t_link" :color="`main_color-${store.mainColor}`" href="https://www.instagram.com/aurelie.runser_pro">instagram</myButton></li>
                    <li><myButton type="t_link" :color="`main_color-${store.mainColor}`" href="https://github.com/Aurelie-Runser">Github</myButton></li>
                </ul>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.apropos{

    &__avant{
        color: $c-white;
        text-transform: uppercase;
    }

    &__contact{
        margin: $pc-m-lg 0;
    }
}
</style>
  
<script setup>
const store = useGlobalStore()

const router = useRouter()

// suppression du token pour déconnecter l'utilisateur
const deconnexion = async () => {
    store.clearToken()
    router.push('/login')
}

useSeoMeta({
    title: "À Propos - How To Meet Aliens ?",
    description: "Page À Propos du jeu narratif How To Meet Aliens ?",
    ogTitle: "How To Meet Aliens ? Page À Propos",
    ogDescription: "Page À Propos du jeu narratif How To Meet Aliens ?",
    ogImage: "/how_to_meet_aliens_logo.png",
})
</script>