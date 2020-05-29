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

            <el-form-item prop="username" label="用户名">
                <el-input placeholder="用户名" v-model="form.username"/>
            </el-form-item>

            <el-form-item prop="password" label="密码" v-if="isCreate">
                <el-input placeholder="密码" v-model="form.password" type="password"/>
            </el-form-item>

            <el-form-item prop="fullName" label="姓名">
                <el-input placeholder="姓名" v-model="form.fullName"/>
            </el-form-item>

            <el-form-item prop="phone" label="电话">
                <el-input placeholder="电话" v-model="form.phone"/>
            </el-form-item>

            <el-form-item prop="email" label="邮箱">
                <el-input placeholder="邮箱" v-model="form.email"/>
            </el-form-item>

            <el-form-item prop="enable" label="启用">
                <el-checkbox v-model="form.enable"/>
            </el-form-item>

            <el-form-item prop="locked" label="锁定">
                <el-checkbox v-model="form.locked"/>
            </el-form-item>

            <el-form-item prop="groups" label="分组">
                <group-selector v-model="form.groups" multiple style="width: 100%;"/>
            </el-form-item>

        </el-form>

    </lan-form-dialog>
</template>

<script>
    import { formPageMixin } from '@/roadhog/formPageMixin';
    import { dialogMixin } from '@/roadhog/dialogMixin';
    import * as validators from '@/roadhog/validators';
    import GroupSelector from '@/components/common/GroupSelector';

    const storeModuleName = 'user';

    export default {
        components: { GroupSelector },
        mixins: [formPageMixin(storeModuleName), dialogMixin()],
        data () {
            return {
                partTitle: '用户',
            };
        },
        methods: {
            initForm () {
                return {
                    username: {
                        rules: [validators.required(), validators.validateAsync(this.checkUnique({ property: 'username' }))],
                    },
                    password: {
                        rules: [validators.required()],
                    },
                    fullName: {
                        rules: [validators.required()],
                    },
                    phone: {
                        rules: [validators.required()],
                    },
                    email: {
                        rules: [validators.email()],
                    },
                    enable: {
                        default: true,
                    },
                    locked: {
                        default: false,
                    },
                    groups: {
                        default: [],
                        set: (formData) => (formData && formData.groups) ? _.map(formData.groups, 'id') : [],
                    },
                };
            },
            processValues (values) {
                if (!this.isCreate) {
                    delete values.password;
                }
                return values;
            },
        },
    };
</script>
