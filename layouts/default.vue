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
    display: grid;
    grid-template: 
        "header"
        "aside"
        "main";

    > * {
        margin: 0;
        width: 100%;
    }

    &__header {
        background: blue;
        grid-area: header;
    }

    &__aside {
        background: red;
        grid-area: aside;  
    }

    &__main {
        grid-area: main;
        overflow: scroll;
    }

    @include medium {
        grid-template:
            "header header header"
            "aside main main";

        &__aside {
            width: 400px;
        }

        &__main {
            width: 100%;
        }
    }
}
</style>