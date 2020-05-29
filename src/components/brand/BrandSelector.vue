<template>
    <el-select :value="value"
               :disabled="readonly"
               :multiple="multiple"
               clearable
               @change="handleChange"
               :placeholder="placeholder"
    >
        <el-option v-for="b of brands"
                   :key="b.id"
                   :label="b.name"
                   :value="b.id"
        />
    </el-select>
</template>

<script>
    export default {
        computed: {
            brands () {
                return this.$store.state.brand.brands;
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
                default: '品牌',
            },
        },
    };
</script>
