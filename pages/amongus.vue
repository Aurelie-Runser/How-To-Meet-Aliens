<template>
    <div class="amongus">
        <div>
            <img src="/among_us.png" alt="image d'un Among Us vert">
            <myButton v-if="store.token" link="/historique" class="amongus__button" type="t_button">Retour</myButton>
            <myButton v-else link="/" class="amongus__button" type="t_button">Retour</myButton>
        </div>
    </div>
</template>

<style lang="scss">
.amongus{
    width: 100vw;
    height: 100vh;
    background: black;
    padding: $ph-m-sm;
    display: grid;
    place-items: center;
    
    img{
        display: block;
        max-width: 200px;
    }

    &__button{
        display: block;
        width: fit-content;
        margin: auto ;
    }

}
</style>

<script setup>
import {API} from '@/utils/axios'

const store = useGlobalStore()

const router = useRouter()

const amongus = async () => {
    try {
        await API.post(`/amongus/${store.token}`);       
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'easter egg :", error.message)
    }
}

// chargement de la base de données
onMounted(async() => {
    await store.token
    
    if (store.token) {
        await amongus()
    }
})
</script>