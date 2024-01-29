
<template>
    <button>
        <nuxt-link class="myButton" :class="className" :to="link" v-if="link"><slot/></nuxt-link>
        
        <a class="myButton" :class="className" :href="href" v-else-if="href" target="_blank" rel="noopener noreferrer"><slot/></a>
        
        <span class="myButton" :class="className" v-else><slot/></span>
    </button>
</template>

<style lang="scss">
.myButton{
    flex: none;
    display: block;
    cursor: pointer;

    &.-t_button{
        @include my_button;
    
        &:hover{
            background: darken($c-main, 10%);
        }
    
        &.-big{
            padding: $ph-m-md $ph-m-lg;
            font-size: $ph-f-xl;
            
        }
        @include medium{
            &.-big{
                padding: $pc-m-sm $pc-m-lg;
                font-size: $pc-f-xl;
            }
        }
    }

    &.-t_link{
        padding: 5px;
        height: fit-content;
        font-size: $ph-f-md;
        font-weight: $fw-bold;
        font-style: italic;
        color: $c-main;
        text-transform: uppercase;
        word-wrap: break-word;
    
        &:hover{
            background-color: $c-main;
            color: $c-black;
        }
    
        &.-small{
            font-size: $ph-f-sm;
        }

        @include medium{
            font-size: $pc-f-md;

            &.-small{
                font-size: $pc-f-sm;
            }
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