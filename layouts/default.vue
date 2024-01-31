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
    grid-template-rows: min-content min-content auto;

    > * {
        margin: 0;
    }

    &__header {
        // background: blue;
        grid-area: header;
    }

    &__aside {
        // background: red;
        grid-area: aside;  
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: $ph-m-md;
        max-height: 33vh;
        padding: $ph-m-md;
        border-top: solid 2px $c-main;
        border-bottom: solid 2px $c-main;
        overflow: scroll;
    }

    &__main {
        // background-color: plum;
        grid-area: main;
        overflow: scroll;
        height: auto;
        padding: $ph-m-md;
    }

    @include medium {
        grid-template:
            "header header header header"
            "aside main main main";
        grid-template-rows: min-content auto;
        grid-template-columns: 33% auto;

        &__header{
            padding: $pc-m-sm;
        }

        &__aside {
            padding: $pc-m-md;
            padding-top: 0;
            gap: $pc-m-md;
            max-height: fit-content;
            border: none;
            border-right: 1px solid $c-main;
        }

        &__main {
            padding: $pc-m-xl2;
            padding-top: 0;
        }
    }
}
</style>