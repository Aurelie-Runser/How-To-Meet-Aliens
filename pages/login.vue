<template>
    <div class="global-ecran">
        <NuxtLayout name="intro" class="login">
            <h1 class="login__h1">How to meet aliens ?</h1>
    
            <div class="login__textes">
                <p>Pour accéder à votre bureau, veuillez vous connecter.</p>
                <p>Vous pourrez communiquer avec l'astronaute Spike Spiegel et avoir accès à l'historique de vos précédentes missions.</p>
        
                <form class="login__form" @submit.prevent="connexion" method="post">
                    <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userCo.pseudo">
                    <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userCo.mdp">
                    <input class="login__form--bouton" type="submit" value="Je me connecte">
                </form>
        
                <form class="login__form" @submit.prevent="inscription" method="post">
                    <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userNew.pseudo">
                    <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userNew.mdp">
                    <input class="login__form--bouton" type="submit" value="Je me connecte">
                </form>
        
                <p>Message : {{ message }}</p>
            </div>
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.login{
    &__textes{
        width: fit-content;
        margin: auto
    }

    &__h1{
        @include h2;
        margin-bottom: $ph-m-xl2;
    }

    &__form{

        &--bouton{
            @include my_button;
        }
    }
}
</style>

<script setup>
import {API} from '@/utils/axios'
const store = useGlobalStore()

const router = useRouter()
const userNew = ref({})
const userCo = ref({})
const message = ref("")

const inscription = async () => {
    try {
        const response = await API.post(`/user/add`, userNew.value);        

        if(response.data.message == "deja inscrit"){
            message.value = "Ce pseudo est déjà enregistré dans la base de données."
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
            message.value = "Ce pseudo n'est pas enregistré dans la base de données."
        } else if(response.data.message == "mauvais mdp"){
            message.value = "Mauvais mot de passe"
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