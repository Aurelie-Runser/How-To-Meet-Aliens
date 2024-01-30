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
        padding: $ph-m-md;
    }

    &__aside {
        // background: red;
        position: relative;
        grid-area: aside;  
        padding: $ph-m-md;

        &::before{
            content: "";
            position: absolute;
            bottom: 0;
            right: 5%;
            display: block;
            width: 90%;
            height: 1px;
            background: $c-main;
        }

        &::after{
            content: "";
            position: absolute;
            top: 0;
            right: 5%;
            display: block;
            width: 90%;
            height: 1px;
            background: $c-main;
        }
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

        &__aside {
            padding: $pc-m-md;
            padding-top: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: $pc-m-md;
            overflow: scroll;
            border-right: 1px solid $c-main;

            &::before,
            &::after{
                display: none;
            }
        }

        &__main {
            padding: $pc-m-xl2;
            padding-top: 0;
        }
    }
}
</style>