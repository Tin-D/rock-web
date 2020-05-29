<template>
    <lan-form-dialog
        ref="lanDialog"
        :title="title"
        @submit="handleSubmit"
        @close="handleClose"
        :is-loading="isLoadingFormData"
    >

        <el-form v-if="!isLoadingFormData"
                 ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 size="mini"
        >
            <el-form-item prop="name" label="名称">
                <el-input label="名称" v-model="form.name"/>
            </el-form-item>

            <el-form-item prop="customerId" label="所属客户">
                <el-select v-model="form.customerId" clearable filterable style="width: 100%;">
                    <el-option v-for="c of customers"
                               :key="c.id"
                               :value="c.id"
                               :label="c.name"
                    />
                </el-select>
            </el-form-item>

            <el-form-item prop="remark" label="备注">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注" v-model="form.remark"/>
            </el-form-item>

        </el-form>

    </lan-form-dialog>
</template>

<script>
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import * as validators from '@/roadhog/validators';
    import { actionTypes } from '@/store/actionTypes';
    import { models } from '@/store/models';

    const storeModuleName = models.computerRoom;

    export default {
        mixins: [formPageMixin(storeModuleName), dialogMixin()],
        created () {
            this.$store.dispatch(`${models.customer}/${actionTypes.common.listOptions}`);
        },
        data () {
            return {
                partTitle: '机房信息',
            };
        },
        computed: {
            customers () {
                return this.$store.state.customer.options;
            },
        },
        methods: {
            initForm () {
                return {
                    name: {
                        rules: [validators.required()],
                    },
                    remark: {},
                    customerId: {},
                };
            },
            processValues (values) {
                return values;
            },
        },
    };
</script>
