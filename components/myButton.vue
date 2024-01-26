
<template>
    <button>
        <nuxt-link class="myButton" :class="className" :to="link" v-if="link"><slot/></nuxt-link>
        
        <a class="myButton" :class="className" :href="href" v-else-if="href" target="_blank" rel="noopener noreferrer"><slot/></a>
        
        <span class="myButton" :class="className" v-else><slot/></span>
    </button>
</template>

<style lang="scss">
.myButton{
    display: block;
    cursor: pointer;

    &.-t_button{
        @include my_button;
    
        &:hover{
            background: darken($c-main, 10%);
        }
    
        &.-big{
            padding: $pc-m-sm $pc-m-lg;
            font-size: $pc-f-xl;
        }
    }

    &.-t_link{
        width: fit-content;
        height: fit-content;
        font-size: $pc-f-md;
        font-weight: $fw-bold;
        font-style: italic;
        color: $c-main;
        text-transform: uppercase;
    
        &:hover{
            color: darken($c-main, 10%);
        }
    
        &.-small{
            font-size: $pc-f-sm;
        }
    }
}
</style>

<script setup>
const props = defineProps({
    link: String,
    href: String,
    type: String,
    size: String,
});

const className = computed(() => ({
    " -t_button": props.type === "t_button",
    " -big": props.size === "big",
    " -t_link": props.type === "t_link",
    " -small": props.size === "small",
}));
</script>