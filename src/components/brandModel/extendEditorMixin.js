export default {
    created () {
        if (this.recorder && this.recorder.configs) {
            const configs = JSON.parse(this.recorder.configs);
            Object.assign(this.form, configs);
        }
    },
    methods: {
        async collectValues () {
            await this.$refs.form.validate();
            return this.form;
        },
    },
    props: {
        recorder: {
            type: Object,
        },
    },
};
