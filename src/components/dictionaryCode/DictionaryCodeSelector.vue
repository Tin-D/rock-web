<template>
    <el-cascader
        :value="value"
        :options="options"
        @change="handleChange"
        :props="{multiple, emitPath, value: 'id', label: 'name'}"
        :disabled="disabled || readonly"
        :clearable="clearable"
        :show-all-levels="showAllLevels"
        :filterable="filterable"
        :placeholder="placeholder"
    />
</template>

<script>
    import { getterTypes } from '@/store/getterTypes';

    export default {
        computed: {
            options () {
                let result;
                if (this.rootId) {
                    result = this.$store.getters[`dictionaryCode/${getterTypes.dictionaryCode.getChildrenTreeByParentId}`](this.rootId);
                } else if (this.rootCode) {
                    result = this.$store.getters[`dictionaryCode/${getterTypes.dictionaryCode.getChildrenTreeByParentCode}`](this.rootCode);
                } else {
                    result = this.$store.getters[`dictionaryCode/${getterTypes.dictionaryCode.getCodeTree}`];
                }

                return result;
            },
        },
        methods: {
            handleChange (value) {
                this.$emit('input', value);
            },
        },
        props: {
            value: {},
            multiple: {
                type: Boolean,
                default: false,
            },
            emitPath: {
                type: Boolean,
                default: false,
            },
            clearable: {
                type: Boolean,
                default: false,
            },
            showAllLevels: {
                type: Boolean,
                default: true,
            },
            filterable: {
                type: Boolean,
                default: true,
            },
            rootId: {
                type: String,
            },
            rootCode: {
                type: String,
            },
            placeholder: {
                type: String,
                default: '请选择',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
