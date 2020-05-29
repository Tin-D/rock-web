import { actionTypes } from '@/store/actionTypes';

export default {
    methods: {
        async collectValues () {
            await this.$refs.form.validate();
            return this.form;
        },
        async loadExtendInfo () {
            if (this.equipmentId) {
                const extendInfo = await this.$store.dispatch(`equipment/${actionTypes.equipment.getExtendInfo}`, this.equipmentId);
                Object.assign(this.form, extendInfo);
            }
        },
    },
    props: {
        recorder: {
            type: Object,
        },
    },
};
