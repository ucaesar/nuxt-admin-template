<template>
    <div>
        <v-snackbar v-model="visible" top :color="color" :timeout="timeout">
            {{ text }}
            <v-btn icon x-small @click="visible = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data: () => ({
        timeout: 3000
    }),
    computed: {
        ...mapState('message', ['text', 'color']),
        visible: {
            get() {
                return this.$store.state.message.visible
            },
            set(val) {
                this.SET_VISIBLE(val)
            }
        }
    },
    methods: {
        ...mapMutations('message', ['SET_VISIBLE'])
    }
}
</script>

<style>
</style>