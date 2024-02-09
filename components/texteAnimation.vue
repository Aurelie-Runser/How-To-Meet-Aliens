<template>
    <span class="machineAEcrire">{{ texte }}</span>
</template>

<style lang="scss">
.machineAEcrire{}
</style>
  
<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    texte: String,
    debut: Number
});
  
const texte = ref('');
const contenu = props.texte;
const vitesse = 10; // Vitesse de frappe en millisecondes
  
onMounted(() => {
    setTimeout(() => {
    ecrireTexte(contenu);
    }, props.debut*1000)
});
  
function ecrireTexte(contenu) {
    let index = 0;
    const intervalId = setInterval(() => {
        texte.value += contenu[index];
        index++;
        if (index === contenu.length) {
            clearInterval(intervalId);
        }
    }, vitesse);
}
</script>  