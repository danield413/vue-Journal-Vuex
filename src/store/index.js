import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import auth from '@/modules/auth/store'

const store = createStore({
    modules: {
        // Modulos de Vuex
        auth,
        journal,
    }
})

export default store