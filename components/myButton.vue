
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

        // changement de couleur en fonction des bon et mauvais choix durant la mission
        &.-good{
            background: $c-blue;
            color: black;

            &:hover{
                background: darken($c-blue, 10%);
            }
        }

        &.-bad{
            background: $c-red;
            color: black;

            &:hover{
                background: darken($c-red, 10%);
            }
        }
    }

    &.-t_link{
        padding: 5px;
        width: fit-content;
        height: fit-content;
        font-size: $ph-f-md;
        font-weight: $fw-bold;
        font-style: italic;
        color: $c-main;
        text-transform: uppercase;
        text-align: left;
        word-break: break-word;

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
    color: String,
});

const className = computed(() => ({
    " -t_button": props.type === "t_button",
    " -big": props.size === "big",
    " -t_link": props.type === "t_link",
    " -small": props.size === "small",
    " -good": props.color === "good",
    " -bad": props.color === "bad",
}));
</script>