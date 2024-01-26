<template>
    <body>
        <h1>How to meet aliens ?</h1>

        <p>Pour accéder à votre bureau, veuillez vous connecter.</p>
        <p>Vous pourrez communiquer avec l'astronaute Spike Spiegel et avoir accès à l'historique des précédentes tentatives de communication avec les Bourpis.</p>

        <h2>Connexion</h2>
        <form class="login__form" @submit.prevent="connexion" method="post">
            <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userCo.pseudo">
            <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userCo.mdp">
            <input class="login__form--bouton" type="submit" value="Je me connecte">
        </form>

        <h2>Inscription</h2>
        <form class="login__form" @submit.prevent="inscription" method="post">
            <input type="text" name="pesudo" id="pesudo" required placeholder="Pseudo" v-model="userNew.pseudo">
            <input type="text" name="mdp" id="mdp" required placeholder="Mot de Passe" v-model="userNew.mdp">
            <input class="login__form--bouton" type="submit" value="Je me connecte">
        </form>

        <p>Message : {{ message }}</p>
    </body>
</template>

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
            message.value = "Ce pseudo est déjà enregistré"
        } else {
            const { token } = response.data
            store.setToken(token)
            router.push('/desktop')
        }
        
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        message.value = "Erreur lors de l'inscription"
    }
}

const connexion = async () => {
    try {
        const response = await API.post(`/login`, userCo.value)
        const { token } = response.data
        store.setToken(token)
        message.value = "Vous êtes bien connecté. Bonjour"
        router.push('/desktop')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion"
    }
}
</script>