<template>
    <main class="layout">
        <header class="layout__header">
            <slot name="header"></slot>  
        </header>  

        <aside class="layout__aside">
            <slot name="aside"></slot>  
        </aside>

        <div class="layout__main">
            <slot/>  
        </div>
    </main>
</template>

<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
    position: fixed;
    display: grid;
    grid-template: 
        "header"
        "aside"
        "main";

    > * {
        margin: 0;
    }

    &__header {
        // background: blue;
        grid-area: header;
        height: fit-content;
    }

    &__aside {
        // background: red;
        grid-area: aside;  
        height: auto;
    }

    &__main {
        // background-color: plum;
        grid-area: main;
        overflow: scroll;
        height: auto;
    }

    @include medium {
        grid-template:
            "header header header header"
            "aside main main main";
        grid-template-rows: min-content auto;
        grid-template-columns: 33% auto;

        &__aside {
        }

        &__main {
            background: red;
        }
    }
}
</style>