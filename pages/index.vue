<template>
    <div class="global-ecran">
        <NuxtLayout name="intro" class="index">
            <h1>How to meet aliens ?</h1>
    
            <myButton link="/login" type="t_button" size="big">Se connecter</myButton>
        </NuxtLayout >
    </div>
</template>

<style lang="scss">
.index{
    h1{
        @include h2;
    }
}
</style>