<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
            </div>

            <div>
                <input type="file" 
                    @change="onSelectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpeg"
                >

                <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary" @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>

        <hr>

        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="¿Qué sucedió hoy?"
                v-model="entry.text"></textarea>
        </div>

        <Fab 
            icon="fa-save"
            @on:click="saveEntry" 
        />

        <img v-if="entry.pciture" :src="entry.picture"
            alt="entry-picture" class="img-thumbnail">

        <img v-if="localImage" :src="localImage" alt="entry-picture" class="img-thumbnail">

    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex' //computed.
import Swal from 'sweetalert2'

import getDatMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
    props: {
        id: {
            type: String,
            required: true
        },
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDatMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDatMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const { yearDay } = getDatMonthYear(this.entry.date)
            return yearDay
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry

            if( this.id === 'new' ) {
                entry = {
                    date: new Date().getTime(),
                    text: '',
                }
            } else {
                entry = this.getEntryById(this.id)
                if (!entry) return this.$router.push({ name: 'no-entry' })
            }

            this.entry = entry

        },
        async saveEntry() {

            new Swal({
                title: 'Espera por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()

            const picture = await uploadImage( this.file )

            this.entry.picture = picture

            if( this.entry.id ) {
                //Actualizar
                this.updateEntry( this.entry )
            } else {
                //Crear una nueva entrada
                const id = await this.createEntry( this.entry )

                this.$router.push({
                    name: 'entry',
                    params: { id }
                })
            }

            Swal.fire('Guardado','Entrada guardada con éxito!', 'success')
        },
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: false,
                showDenyButton: true,
                confirmButtonText: 'Sí, borrar',
                denyButtonText: 'No, cancelar',
                confirmButtonColor: '#d33',
                denyButtonColor: '#3085d6',
            })

            if( isConfirmed ) {
                new Swal({
                    title: 'Espera por favor',
                    allowOutsideClick: false,
                })
                Swal.showLoading()
                await this.deleteEntry( this.entry.id )
                this.$router.push({ name: 'no-entry' })

                Swal.fire('Eliminada', '', 'success')
            }
        },
        onSelectedImage( event ) {
            const file = event.target.files[0]
            if(!file) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () =>  this.localImage = fr.result
            fr.readAsDataURL(file)
        },
        onSelectImage() {
            this.$refs.imageSelector.click()
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    resize: none;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }

}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2)
}
</style>