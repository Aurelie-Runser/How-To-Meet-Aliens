<template>
    <main class="layout_intro">
        <body class="layout_intro__main">
            <slot/>  
        </body>
    </main>
</template>

<style lang="scss" scoped>
.layout_intro{
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    padding: $ph-m-xl2 $ph-m-md;
    
    @include medium{
        padding: $pc-m-md;
    }
}
</style>