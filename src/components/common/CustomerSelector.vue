<template>
    <el-select :value="value"
               :multiple="multiple"
               filterable
               remote
               reserve-keyword
               clearable
               :placeholder="placeholder"
               :remote-method="remoteMethod"
               :loading="loading"
               @change="handleChange"
    >
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
    </el-select>
</template>

<script>
    import { Pagination } from '@/roadhog/Pagination';
    import { actionTypes } from '@/store/actionTypes';

    export default {
        name: 'CustomerSelector',
        created () {
            if (this.initOptions?.length > 0) {
                this.options = [...this.initOptions];
            }
        },
        data () {
            return {
                loading: false,
                options: [],
            };
        },
        methods: {
            handleChange (value) {
                this.$emit('input', value);
            },
            async remoteMethod (keywords) {
                if (keywords !== '') {
                    const pagination = new Pagination({
                        sortField: 'name',
                        sortOrder: 'asc',
                        name: keywords,
                    });
                    pagination.setPageSize(100);
                    this.loading = true;
                    const result = await this.$store.dispatch(`customer/${actionTypes.common.list}`, pagination.query);
                    this.options = result.items;
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
        },
        props: {
            multiple: {
                type: Boolean,
                default: false,
            },
            value: {
                required: true,
            },
            placeholder: {
                type: String,
                default: '请输入关键词',
            },
            initOptions: {
                type: Array,
            },
        },
    };
</script>
