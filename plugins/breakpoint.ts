import Vue from 'vue';

Vue.prototype.$breakpoint = new Vue({
    data() {
        return {
            mountedBreakpoints: {},
            default: {
                xs: true,
                xsOnly: true,
                xsAndUp: true,
                sm: false,
                smOnly: true,
                smAndDown: true,
                smAndUp: false,
                md: false,
                mdOnly: false,
                mdAndDown: true,
                mdAndUp: false,
                lg: false,
                lgOnly: false,
                lgAndDown: true,
                lgAndUp: false,
                xl: false,
                xlOnly: false,
                xlAndDown: true
            }
        };
    },
    computed: {
        is() {
            return Object.keys((<any>this.$vuetify).default).reduce(
                (breakpoints, dim) => {
                    breakpoints[dim] = (<any>this).breakpointWithDefault(dim);
                    return breakpoints;
                },
                {}
            );
        },
        isMobile() {
            return (this as any).is.smAndDown;
        }
    },
    methods: {
        breakpointWithDefault(breakpoint) {
            return Object.keys(this.$data.mountedBreakpoints).length > 0
                ? this.$data.mountedBreakpoints[breakpoint]
                : this.$data.default[breakpoint];
        }
    }
});

export default function({ app }) {
    if (!app.mixins) {
        app.mixins = [];
    }

    app.mixins.push({
        mounted() {
            this.$breakpoint.$data.mountedBreakpoints = this.$vuetify.breakpoint;
        }
    });
}
