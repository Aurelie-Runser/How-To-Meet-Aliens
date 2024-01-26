<template>
    <main class="layout">
        <header class="layout__header">
            <slot name="header"></slot>  
        </header>  

        <aside class="layout__aside">
            <slot name="aside"></slot>  
        </aside>

        <body class="layout__main">
            <slot/>  
        </body>
    </main>
</template>

<style lang="scss" scoped>
.layout{
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template: 
        "header"
        "aside"
        "main";

    > * {
        border: 2px solid red;
        margin: 0;
        width: 100%;
    }

    &__header {
        // background: blue;
        grid-area: header;
    }

    &__aside {
        // background: red;
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
            width: 33vw;
        }

        &__main {
            width: 67vw;
        }
    }
}
</style>