<template>
    <div>
        <NuxtLayout name="intro" class="login">
            <h1 class="login__h1">How to meet aliens ?</h1>
    
            <div class="login__content">
                <div class="login__content--textes">
                    <p>Pour accéder à votre bureau, veuillez vous connecter.</p>
                    <p>Vous pourrez communiquer avec l'astronaute Spike Spiegel et avoir accès à l'historique de vos précédentes missions.</p>
                    <p class="global-error" v-if="message">Message : {{ message }}</p>
                </div>
            
                <form class="login__form" @submit.prevent="connexion" method="post" v-if="connex">
                    <div class="login__form--input">
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pesudo" id="pesudo" maxlength="11" required v-model="userCo.pseudo">
                    </div>

                    <div class="login__form--input">
                        <label for="mdp">Mot de Passe</label>
                        <input type="text" name="mdp" id="mdp" required v-model="userCo.mdp">
                    </div>

                    <input class="login__form--bouton" type="submit" value="Je me connecte">

                    <myButton type="t_link" size="small" @click="connex = false">Je_n'ai_pas_de_compte.</myButton>
                </form>
            
                <form class="login__form" @submit.prevent="inscription" method="post" v-if="!connex">
                    <div class="login__form--input">
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pesudo" id="pesudo" maxlength="11" required v-model="userNew.pseudo">
                    </div>

                    <div class="login__form--input">
                        <label for="mdp">Mot de Passe</label>
                        <input type="text" name="mdp" id="mdp" required v-model="userNew.mdp">
                    </div>

                    <input class="login__form--bouton" type="submit" value="Je m'inscris">

                    <myButton type="t_link" size="small" @click="connex = true">J'ai_un_compte.</myButton>
                </form>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.login{
    &__content{
        width: fit-content;
        margin: auto;       
    }

    &__h1{
        @include h2;
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
            margin: $ph-m-sm;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: $ph-m-sm;

            input{
                max-width: 400px
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
    }

    @include medium{

        &__form{
            margin-top: $pc-m-md;

            &--input{
                gap: $pc-m-sm;
            }

            &--bouton{
                margin-top: $pc-m-sm;
                padding: $pc-m-sm $pc-m-lg;
                font-size: $pc-f-xl;
            }
        }
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'
const store = useGlobalStore()

const connex = ref(true)

const router = useRouter()
const userNew = ref({})
const userCo = ref({})
const message = ref("")

const inscription = async () => {
    try {
        const response = await API.post(`/user/add`, userNew.value);        

        if(response.data.message == "deja inscrit"){
            message.value = "Ce pseudo est déjà enregistré dans la base de données. Choisissez-en un autre."
        } else {
            const { token } = response.data
            store.setToken(token)
            router.push('/desktop')
        }
        
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        message.value = "Erreur lors de l'inscription."
    }
}

const connexion = async () => {
    try {
        const response = await API.post(`/login`, userCo.value)

        if(response.data.message == "pas inscrit"){
            message.value = "Ce pseudo n'est pas enregistré dans la base de données"
        } else if(response.data.message == "mauvais mdp"){
            message.value = "Mauvais mot de passe."
        } else {
            const { token } = response.data
            store.setToken(token)
            router.push('/desktop')
        }

    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion."
    }
}
</script>