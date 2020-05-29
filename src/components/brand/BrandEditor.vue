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
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="名称"/>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="备注"
                    v-model="form.remark"
                />
            </el-form-item>

        </el-form>

    </lan-form-dialog>
</template>

<script>
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import * as validators from '@/roadhog/validators';

    const storeModuleName = 'brand';

    export default {
        mixins: [formPageMixin(storeModuleName), dialogMixin()],
        data () {
            return {
                partTitle: '品牌',
            };
        },
        methods: {
            initForm () {
                return {
                    name: {
                        rules: [validators.required(), validators.validateAsync(this.checkUnique())],
                    },
                    remark: {},
                };
            },
            processValues (values) {
                return values;
            },
        },
    };
</script>
