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
    max-width: $xl2;
    height: 100%;
    outline: 5px solid rgba(black, 50%);
    border-radius: 40px;
    overflow: hidden;
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
        outline-width: 15px;
        border-radius: 60px;

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