import { VSheet, VCard, VCardText, VDivider, VCardActions } from 'vuetify/lib';
import mixins from 'vuetify/lib/util/mixins';

export default mixins(VCard)
    .extend()
    .extend({
        name: 'CtCard',
        props: {
            hasHeader: {
                type: Boolean,
                default: true
            },
            headerColor: {
                type: String,
                default: 'green'
            },
            headerTitle: {
                type: String,
                default: ''
            },
            headerText: {
                type: String,
                default: ''
            },
            headerFullWidth: {
                type: Boolean,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            classes() {
                return {
                    ...VCard.options.computed.classes.call(this),
                    'ct-card': true
                };
            },
            headerStyle() {
                return {
                    width: this.headerFullWidth ? '100%' : 'auto',
                    display: this.showHeader ? 'flex' : 'none'
                };
            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            getHeader(h) {
                return (
                    <div class="d-flex grow flex-wrap">
                        <VSheet
                            dark={true}
                            color={this.headerColor}
                            class="text-start ct-card--material__heading mb-n6 px-7 py-4 relative"
                            style={this.headerStyle}
                        >
                            {this.getSlotHeader(h)}
                        </VSheet>
                    </div>
                );
            },
            // eslint-disable-next-line no-unused-vars
            getSlotHeader(h) {
                if (!this.$slots.header) {
                    return (
                        <span>
                            <div class="title font-weight-light">
                                {this.headerTitle}
                            </div>
                            <div class="subtitle-1 font-weight-light">
                                {this.headerText}
                            </div>
                        </span>
                    );
                }

                return this.$slots.header;
            }
        },
        render(h) {
            const { tag, data } = this.generateRouteLink();
            data.style = this.styles;

            if (this.isClickable) {
                data.attrs = data.attrs || {};
                data.attrs.tabindex = 0;
            }

            return h(tag, this.setBackgroundColor(this.color, data), [
                this.getHeader(h),
                this.genProgress(),
                h(VCardText, [this.$slots.default]),
                this.$slots.actions ? h(VDivider, { class: 'mt-2' }) : null,
                this.$slots.actions
                    ? h(VCardActions, [this.$slots.actions])
                    : null
            ]);
        }
    });
