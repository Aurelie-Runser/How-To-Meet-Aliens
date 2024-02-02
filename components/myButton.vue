
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
            color: $c-bblack;

            &:hover{
                background: darken($c-red, 10%);
            }
        }

        // changement de thème en fonction du paramètrage de l'utilisateur
        &.-main_color-2{
            background: $c-red;
            color: $c-bblack;

            &:hover{
                background: darken($c-red, 10%);
            }
        }

        &.-main_color-3{
            background: $c-blue;
            color: $c-bblack;

            &:hover{
                background: darken($c-blue, 10%);
            }
        }

        &.-main_color-4{
            background: $c-pink;
            color: $c-bblack;

            &:hover{
                background: darken($c-pink, 10%);
            }
        }

        &.-main_color-5{
            background: $c-orange;
            color: $c-bblack;

            &:hover{
                background: darken($c-orange, 10%);
            }
        }

        &.-main_color-6{
            background: $c-white;
            color: $c-bblack;

            &:hover{
                background: darken($c-white, 10%);
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

        // changement de thème en fonction du paramètrage de l'utilisateur
        &.-main_color-2{
            color: $c-red;

            &:hover{
                background-color: $c-red;
                color: $c-bblack;
            }
        }

        &.-main_color-3{
            color: $c-blue;

            &:hover{
                background-color: $c-blue;
                color: $c-bblack;
            }
        }

        &.-main_color-4{
            color: $c-pink;

            &:hover{
                background-color: $c-pink;
                color: $c-bblack;
            }
        }

        &.-main_color-5{
            color: $c-orange;

            &:hover{
                background-color: $c-orange;
                color: $c-bblack;
            }
        }

        &.-main_color-6{
            color: $c-white;

            &:hover{
                background-color: $c-white;
                color: $c-bblack;
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

    " -main_color-2": props.color === "main_color-2",
    " -main_color-3": props.color === "main_color-3",
    " -main_color-4": props.color === "main_color-4",
    " -main_color-5": props.color === "main_color-5",
    " -main_color-6": props.color === "main_color-6",
}));
</script>