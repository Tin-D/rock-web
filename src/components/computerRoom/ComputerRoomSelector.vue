<template>
    <el-cascader
        ref="computerRoomSelector"
        :value="value"
        :options="options"
        @change="handleChange"
        :props="{multiple, emitPath: false, value: 'id', label: 'name', children: 'rooms'}"
        :disabled="readonly"
        clearable
        filterable
        :placeholder="placeholder"
    />
</template>

<script>
    import { actionTypes } from '@/store/actionTypes';

    export default {
        created () {
            this.$store.dispatch(`computerRoom/${actionTypes.common.listOptions}`);
        },
        computed: {
            options () {
                return this.$store.state.computerRoom.listOptions;
            },
        },
        methods: {
            handleChange (value) {
                this.$emit('input', value);
            },
        },
        props: {
            value: {
                type: String,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: '机房',
            },
        },
    };
</script>
