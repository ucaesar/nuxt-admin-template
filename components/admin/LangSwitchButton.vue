<template>
    <v-menu>
        <template v-slot:activator="{ on }">
            <v-btn text color="primary" v-on="on">{{ buttonTitle }}</v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="locale in locales"
                :key="locale.code"
                dense
                @click="onSwitchLang(locale)"
            >
                <v-list-item-title>{{ locale.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
class LangSwitchButton extends Vue {
    get locales() {
        return this.$i18n.locales;
    }

    get buttonTitle() {
        const locale = this.locales!.filter(
            i => (i as any).code === this.$i18n.locale
        );
        return (locale[0] as any).name;
    }

    onSwitchLang(locale) {
        window.location.href = this.switchLocalePath(locale.code);
        // this.$router.push(this.switchLocalePath(locale.code));
    }
}

export default LangSwitchButton;
</script>

<style>
</style>