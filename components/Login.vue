<template>
    <v-container class="fill-height" fluid @click="onClick">
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>{{ $t("testString") }}</v-toolbar-title>
                    </v-toolbar>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState(["locale"])
    },
    methods: {
        ...mapMutations(["SET_LOCALE"]),
        onClick() {
            this.SET_LOCALE("en");
        }
    }
};
</script>

<style>
</style>
