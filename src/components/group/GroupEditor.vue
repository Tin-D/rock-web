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
                 size="mini">

            <el-form-item prop="name" label="名称">
                <el-input placeholder="名称" v-model="form.name" :disabled="!form.editable"/>
            </el-form-item>

            <el-form-item prop="code" label="代码">
                <el-input placeholder="代码" v-model="form.code" :disabled="!form.editable"/>
            </el-form-item>

        </el-form>

    </lan-form-dialog>
</template>

<script>
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import * as validators from '@/roadhog/validators';

    const storeModuleName = 'group';

    export default {
        mixins: [formPageMixin(storeModuleName), dialogMixin()],
        data () {
            return {
                partTitle: '分组',
            };
        },
        methods: {
            initForm () {
                return {
                    name: {
                        rules: [validators.required(), validators.validateAsync(this.checkUnique({ property: 'name' }))],
                    },
                    code: {
                        rules: [validators.required(), validators.validateAsync(this.checkUnique({ property: 'code' }))],
                    },
                    editable: {
                        default: true,
                    },
                };
            },
            processValues (values) {
                return values;
            },
        },
    };
</script>
