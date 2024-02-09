<template>
    <span class="animTexte" ref="target" data-target-resolver>{{ resolvedText }}</span>
</template>

<style>
.animTexte{

}
</style>

<script setup>
const props = defineProps({
    texte: String,
    debut: Number
});

const strings = [props.texte];

let counter = 0;

const options = {
    offset: 0,
    timeout: 2,
    iterations: 5,
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    resolveString: strings[counter],
    element: null
};

let resolvedText = ref('');

const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomCharacter = (characters) => {
    return characters[getRandomInteger(0, characters.length - 1)];
};

const doRandomiserEffect = (options, callback) => {
const characters = options.characters;
const timeout = options.timeout;
const element = options.element;
const partialString = options.partialString;

let iterations = options.iterations;

setTimeout(() => {
    if (iterations >= 0) {
        const nextOptions = { ...options, iterations: iterations - 1 };

        if (iterations === 0) {
            element.textContent = partialString;
        } else {
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
        }

        doRandomiserEffect(nextOptions, callback);
    } else if (typeof callback === "function") {
        callback();
    }
  }, options.timeout);
};

const doResolverEffect = (options, callback) => {
  const resolveString = options.resolveString;
  const characters = options.characters;
  const offset = options.offset;
  const partialString = resolveString.substring(0, offset);

  const combinedOptions = { ...options, partialString };

  doRandomiserEffect(combinedOptions, () => {
      const nextOptions = { ...options, offset: offset + 1 };

      if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
      }
  });
};

onMounted(() => {
  options.element = document.querySelector('[data-target-resolver]'); // Utilisation de querySelector pour trouver l'élément

    setTimeout(() => {
        doResolverEffect(options, () => {
        setInterval(() => {
            counter++;
            if (counter >= strings.length) {
                counter = 0;
            }
              options.resolveString = strings[counter];
              doResolverEffect(options);
          }, 1000);
      })
    }, props.debut*1000)
});
</script>