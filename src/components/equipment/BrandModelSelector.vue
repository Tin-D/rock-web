<template>
    <el-cascader :value="value"
                 :options="options"
                 @change="handleChange"
                 :props="{value: 'id', label: 'name', children: 'children', disabled: 'disabled', emitPath: false, checkStrictly: onlySelectModel}"
                 :placeholder="placeholder"
                 clearable
                 filterable
                 :disabled="readonly"
    />
</template>

<script>

    import { actionTypes } from '@/store/actionTypes';

    export default {
        created () {
            this.$store.dispatch(`brandModel/${actionTypes.common.list}`);
        },
        computed: {
            models () {
                return this.$store.state.brandModel.models;
            },
            options () {
                const brands = this.$store.state.brand.brands;
                let result = [];
                for (let b of brands) {
                    const item = {
                        id: b.id,
                        name: b.name,
                        disabled: false,
                    };
                    item.children = _.filter(this.models, n => n.brandId === b.id).map(n => {
                        return {
                            id: n.id,
                            name: `${n.name} (${this.renderDictionaryCodeName(n.typeId)})`,
                            disabled: false,
                        };
                    });
                    if (item.children.length === 0) {
                        item.children = null;
                    }
                    result.push(item);
                }

                if (this.onlySelectModel) {
                    result = result.find(i => i.children && i.children.length > 0);
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
            value: {
                type: String,
            },
            placeholder: {
                type: String,
                default: '品牌型号',
            },
            onlySelectModel: { // 只允许选择型号
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
