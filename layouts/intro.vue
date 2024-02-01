<template>
    <main class="layout_intro">
        <div class="layout_intro__main">
            <slot/>  
        </div>
    </main>
</template>

<style lang="scss" scoped>
.layout_intro{
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding: $ph-m-xl2 $ph-m-md;
    background: $c-black radial-gradient(rgba($c-main, 10%) 5%, transparent);
    
    @include medium{
        padding: $pc-m-md;
    }
}
</style>