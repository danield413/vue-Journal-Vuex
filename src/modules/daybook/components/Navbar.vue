<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img src="@/assets/logo.png" alt="logo"
                width="24" height="24"
                class="d-inline-block align-text-top mx-2">
            😎 Hola, {{ username }}
        </a>

        <div class="d-flex">
            <button class="btn btn-outline-info mx-2"
                @click="onLogout">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>


<script>
import useAuth from '@/modules/auth/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
    setup() {

        const { username, logout } = useAuth()
        const router = useRouter()

        return {
            username,
            onLogout: () => {
                router.push({ name: 'login' })
                logout()
            }
        }
    }
}
</script>