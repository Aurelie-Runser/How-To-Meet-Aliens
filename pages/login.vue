<template>
    <div>
        <NuxtLayout name="intro" class="login">
            <h1 class="login__h1">How to meet aliens ?</h1>
    
            <div class="login__content">
                <div class="login__content--textes">
                    <!--soit le texte s'anime s'i l'utilisateur vient de la page d'accueil, soit il s'affiche en entier s'il vient d'une autre page-->
                    <p v-if="texte1Affiche">Pour accéder à votre bureau, veuillez vous connecter.</p>
                    <p v-else><texteAnimation debut="0.5" texte="Pour accéder à votre bureau, veuillez vous connecter."/></p>

                    <p v-if="texte2Affiche">Vous pourrez communiquer avec l'astronaute Spike Spiegel et avoir accès à l'historique de vos précédentes missions.</p>
                    <p v-else><texteAnimation debut="1.5" texte="Vous pourrez communiquer avec l'astronaute Spike Spiegel et avoir accès à l'historique de vos précédentes missions."/></p>

                    <p class="global-error" v-if="message">Message : {{ message }}</p>
                </div>
            
                <form class="login__form" @submit.prevent="connexion" method="post" v-if="connex">
                    <myButton v-if="autreAffiche" type="t_link" size="small" @click="connex = false">Je_n'ai_pas_de_compte.</myButton>

                    <div v-if="pseudoAffiche" class="login__form--input">
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pesudo" id="pesudo" maxlength="11" required v-model="userCo.pseudo">
                    </div>

                    <div v-if="mdpAffiche" class="login__form--input">
                        <label for="mdp">Mot de Passe</label>
                        <input :type="mdpVisible" name="mdp" id="mdp" required v-model="userCo.mdp">
                        <div class="login__form--input__mdpvisible">
                            <button v-if="mdpVisible == 'password'" type="t_button" @click="mdpVisible = 'text'">voir</button>
                            <button v-if="mdpVisible == 'text'" type="t_button" @click="mdpVisible = 'password'">cacher</button>
                        </div>
                    </div>
                    
                    <p v-if="chargement" class="login__form--charge">Chargement</p>
                    <input v-if="!chargement && connectAffiche" class="login__form--bouton" type="submit" value="Je me connecte">
                </form>
            
                <form class="login__form" @submit.prevent="inscription" method="post" v-if="!connex">
                    <myButton type="t_link" size="small" @click="connex = true">J'ai_un_compte.</myButton>

                    <div class="login__form--input">
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pesudo" id="pesudo" maxlength="11" required v-model="userNew.pseudo">
                    </div>

                    <div class="login__form--input">
                        <label for="mdp">Mot de Passe</label>
                        <input :type="mdpVisible" name="mdp" id="mdp" required v-model="userNew.mdp">
                        <div class="login__form--input__mdpvisible">
                            <button v-if="mdpVisible == 'password'" type="t_button" @click="mdpVisible = 'text'">voir</button>
                            <button v-if="mdpVisible == 'text'" type="t_button" @click="mdpVisible = 'password'">cacher</button>
                        </div>
                    </div>

                    <p v-if="chargement" class="login__form--charge">Chargement</p>
                    <input v-else class="login__form--bouton" type="submit" value="Je m'inscris">
                </form>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.login{
    &__content{
        width: auto;
        max-width: 1000px;
        margin: auto;       
    }

    &__h1{
        margin-bottom: $ph-m-xl2;
    }

    &__form{
        width: fit-content;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: $ph-m-md;
        
        &--input{
            position: relative;
            margin: $ph-m-sm;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: $ph-m-sm;
            overflow: hidden;

            input{
                max-width: 400px
            }

            &__mdpvisible{
                position: absolute;
                right: 0;

                button {
                    @include my_button;
                    font-size: $ph-f-xs;
                    padding: $ph-m-md $ph-m-sm;
                    border-radius: 0;

                    &:hover{
                        background: darken($c-main, 10%)
                    }
                }
            }
        }

        &--bouton{
            @include my_button;
            padding: $ph-m-md $ph-m-lg;
            font-size: $ph-f-xl;
            display: block;
            margin: auto;
            margin-top: $ph-m-md;
            
            &:focus{
                background: darken($c-main, 10%);
            }
        }

        &--charge{
            margin-inline: auto;
            font-weight: $fw-bold;
            text-transform: uppercase;
            font-size: $ph-f-xl;

            &::after{
                content: "";
                animation: animCharge 2s infinite;
            }
        }
    }

    @include medium{

        &__form{
            margin-top: $pc-m-md;

            &--input{
                gap: $pc-m-sm;

                &__mdpvisible{

                    button {
                        display: block;
                        font-size: $pc-f-sm;
                        padding: $pc-m-md $pc-m-sm;
                        border-radius: 0;
                    }
                }

            }

            &--bouton{
                margin-top: $pc-m-sm;
                padding: $pc-m-sm $pc-m-lg;
                font-size: $pc-f-xl;
            }

            &--charge{
                font-size: $pc-f-xl;
            }
        }
    }
}

@keyframes animCharge{
    0% {
        content: '';
    }
    25% {
        content: '.';
    }
    50% {
        content: '..';
    }
    75% {
        content: '...';
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'
const store = useGlobalStore()
const route = useRoute();

const connex = ref(true)
const chargement = ref(false)
const mdpVisible = ref("password")

const router = useRouter()
const userNew = ref({})
const userCo = ref({})
const message = ref("")

const texte1Affiche = ref()
const texte2Affiche = ref()
const pseudoAffiche = ref()
const mdpAffiche = ref()
const connectAffiche = ref()
const autreAffiche = ref()

const inscription = async () => {
    chargement.value = true
    try {
        const response = await API.post(`/user/add`, userNew.value);        

        if(response.data.message == "deja inscrit"){
            message.value = "Ce pseudo est déjà enregistré dans la base de données. Choisissez-en un autre."
        } else {
            const {token} = response.data
            const pseudo = userNew.value.pseudo
            store.setUser(JSON.parse(token), pseudo, 1, 0)
            router.push('/desktop')
        }
        chargement.value = false
        
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        message.value = "Erreur lors de l'inscription."
        chargement.value = false
    }
}

const connexion = async () => {
    chargement.value = true
    try {
        const response = await API.post(`/login`, userCo.value)

        if(response.data.message == "pas inscrit"){
            message.value = "Ce pseudo n'est pas enregistré dans la base de données"
        } else if(response.data.message == "mauvais mdp"){
            message.value = "Mauvais mot de passe."
        } else {
            const token = response.data.id_user
            const pseudo = userCo.value.pseudo
            const mainColor = response.data.id_color
            const raportsDebloques = response.data.rapports_debloques.length
            store.setUser(JSON.parse(token), pseudo, mainColor, raportsDebloques)
            router.push('/desktop')
        }
        
        chargement.value = false
        
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion."
        chargement.value = false
    }
}

const fromIndex = route.query.fromIndex == 'true';

onMounted(() => {
    // si l'utilisateur vient de l'index, animer le texte et les boutons
    if (fromIndex) {
        setTimeout(() => {
            pseudoAffiche.value = true;
        }, 3600);
    
        setTimeout(() => {
            mdpAffiche.value = true;
        }, 4100);
    
        setTimeout(() => {
            connectAffiche.value = true;
        }, 4600);
    
        setTimeout(() => {
            autreAffiche.value = true;
        }, 5100);
    } else {
        texte1Affiche.value = true;
        texte2Affiche.value = true;
        pseudoAffiche.value = true;
        mdpAffiche.value = true;
        connectAffiche.value = true;
        autreAffiche.value = true;
    }
});

useSeoMeta({
    title: "Login - How To Meet Aliens ?",
    description: "Page de connexion du jeu narratif How To Meet Aliens ?",
    ogTitle: "How To Meet Aliens ? Page Login",
    ogDescription: "Page de connexion du jeu narratif How To Meet Aliens ?",
    ogImage: "/how_to_meet_aliens_logo.png",
})
</script>