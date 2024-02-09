export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return;
        const token = localStorage.getItem('Token de Connexion');
    // console.log(token);
    if (!token || token == "null") {
        return navigateTo('/login')
    }
})