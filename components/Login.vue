<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>登录</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field label="Username" prepend-icon="mdi-account"></v-text-field>
                            <v-text-field label="Password" prepend-icon="mdi-lock"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="primary" class="mb-1">登录</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
