<template>
    <main class="layout_intro">
        <div class="layout_intro__main">
            <slot/>  
        </div>
    </main>
</template>

<style lang="scss" scoped>
.layout_intro{
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding: $ph-m-xl2 $ph-m-md;
    
    @include medium{
        padding: $pc-m-md;
    }
}
</style>