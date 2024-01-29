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
    height: 100%;
    padding: $ph-m-md;
    
    @include medium{
        padding: $pc-m-md;
    }
}
</style>