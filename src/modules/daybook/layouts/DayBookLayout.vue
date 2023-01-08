<template>
    <Navbar />

    <div v-if="isLoading" class="row d-flex justify-content-md-center">
        <div class="col-3 alert alert-info text-center mt-5">
            <p class="fw-bold">Espera por favor...</p>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-else class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <router-view />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
    
    components: {
        Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
        EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')),
    },
    methods: {
        ...mapActions('journal', ['loadEntries'])
    },
    computed: {
        ...mapState('journal', ['isLoading'])
    },
    created() {
        this.loadEntries()
    }
}
</script>