import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'

const store = createStore({
    modules: {
        // Modulos de Vuex
        journal
    }
})

export default store